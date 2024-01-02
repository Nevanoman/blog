import { Pagination } from 'antd'
import { useDispatch } from 'react-redux'
import classes from './Footer.module.scss'
import { changePage } from '../../store/articlesReducer'

function Footer() {
  const dispatch = useDispatch()

  function onChangePagination(e) {
    dispatch(changePage(e))
  }
  return (
    <div className={classes.footer}>
      <Pagination defaultCurrent={1} total={500} onChange={onChangePagination} />
    </div>
  )
}

export default Footer