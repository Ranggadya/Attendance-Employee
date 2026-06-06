import { useState, useEffect, useCallback } from 'react'
import * as storage from '../utils/storage'
import { generateId, sortData } from '../utils/helpers'

const ITEMS_PER_PAGE = 10
const DEFAULT_CHECK_IN = '08:00'

const getLocalDate = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

const getTodayLabel = () => new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date())

export function useAttendance() {
  const [records, setRecords] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: 'tanggal_absen', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  /* ------ bootstrap data ------ */
  useEffect(() => {
    storage.seed()
    setRecords(storage.getAll())
  }, [])

  const refresh = useCallback(() => {
    setRecords(storage.getAll())
  }, [])

  /* ------ CRUD ------ */
  const create = useCallback((formData) => {
    const record = {
      ...formData,
      id: generateId(),
      created_at: Date.now(),
      updated_at: Date.now(),
    }
    storage.save(record)
    refresh()
    return record
  }, [refresh])

  const update = useCallback((id, formData) => {
    const record = storage.update(id, formData)
    refresh()
    return record
  }, [refresh])

  const remove = useCallback((id) => {
    storage.remove(id)
    refresh()
    // stay on current page unless it becomes empty
    setCurrentPage((prev) => prev)
  }, [refresh])

  /* ------ Sort ------ */
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
    setCurrentPage(1)
  }, [])

  /* ------ Derived data pipeline ------ */
  const filtered = records.filter((r) => {
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || (
      r.nama.toLowerCase().includes(q) ||
      r.alamat.toLowerCase().includes(q) ||
      r.jenis_kelamin.toLowerCase().includes(q) ||
      r.tanggal_absen.includes(q)
    )

    const matchesGender = !genderFilter || r.jenis_kelamin === genderFilter
    const matchesDate = !dateFilter || r.tanggal_absen === dateFilter

    return matchesSearch && matchesGender && matchesDate
  })

  const sorted = sortData(filtered, sortConfig)
  const todayRecords = records.filter((record) => record.tanggal_absen === getLocalDate())
  const statistics = {
    presentToday: todayRecords.length,
    onTimeToday: todayRecords.filter((record) => record.jam_masuk <= DEFAULT_CHECK_IN).length,
    lateToday: todayRecords.filter((record) => record.jam_masuk > DEFAULT_CHECK_IN).length,
    defaultCheckIn: DEFAULT_CHECK_IN,
    todayLabel: getTodayLabel(),
  }

  const totalItems = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  // guard page out of bounds after delete/search
  const safePage = Math.min(currentPage, totalPages)

  const paginated = sorted.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(safePage * ITEMS_PER_PAGE, totalItems)

  return {
    /* data */
    records: paginated,
    totalItems,
    totalRecords: records.length,
    startIndex,
    endIndex,
    statistics,
    /* sort */
    sortConfig,
    handleSort,
    /* search */
    search,
    setSearch: (val) => { setSearch(val); setCurrentPage(1) },
    /* gender filter */
    genderFilter,
    setGenderFilter: (val) => { setGenderFilter(val); setCurrentPage(1) },
    dateFilter,
    setDateFilter: (val) => { setDateFilter(val); setCurrentPage(1) },
    clearFilters: () => {
      setGenderFilter('')
      setDateFilter('')
      setCurrentPage(1)
    },
    /* sort controls */
    setSortKey: (key) => {
      setSortConfig((prev) => ({ ...prev, key }))
      setCurrentPage(1)
    },
    setSortDirection: (direction) => {
      setSortConfig((prev) => ({ ...prev, direction }))
      setCurrentPage(1)
    },
    /* pagination */
    currentPage: safePage,
    totalPages,
    setCurrentPage,
    /* CRUD */
    create,
    update,
    remove,
    getById: storage.getById,
  }
}
