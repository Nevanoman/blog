import { Pagination } from 'antd'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import classes from './Footer.module.scss'
import { changePage } from '../../store/articlesReducer'

function Footer() {
  const dispatch = useDispatch()

  const storedPage = parseInt(localStorage.getItem('currentPage'), 10) || 1

  const [currentPage, setCurrentPage] = useState(storedPage)

	useEffect(() => {
	dispatch(changePage(currentPage))
}, [dispatch, currentPage])

  function onChangePagination(e) {
		setCurrentPage(e)
		localStorage.setItem('currentPage', e.toString())

    dispatch(changePage(e))
  }
  return (
    <div className={classes.footer}>
      <Pagination defaultCurrent={storedPage} total={500} onChange={onChangePagination} />
    </div>
  )
}

export default Footer
