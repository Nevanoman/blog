import { Routes, Route } from 'react-router-dom'

// import Footer from '../Footer'
import Header from '../Header'
import ListArticles from '../List-articles'
import ExpandedArticle from '../Expanded-article'
import LoginPage from '../Login-page'
import RegistrationPage from '../Registration-page'
import EditProfilePage from '../EditProfile-page'
import CreateArticle from '../Create-article'
import RequireAuth from '../hoc/RequireAuth'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ListArticles />} />
          <Route path="articles/" element={<ListArticles />} />

          <Route path="articles/:id" element={<ExpandedArticle />} />
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="sign-up" element={<RegistrationPage />} />
          <Route path="profile" element={<EditProfilePage />} />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route path="articles/:id/edit" element={<CreateArticle action="edit" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
