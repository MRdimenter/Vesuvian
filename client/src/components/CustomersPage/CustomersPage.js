import { useEffect, useState } from "react"
import { OAuth2Service } from "../../common/utils/OAuth2Service";
import { ApiService } from "../../common/utils/ApiService";
import { BadRequestError, RefreshTokenMissingError, ServerError } from "../../common/utils/Errors/Errors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationAction } from "../../store/actions/authenticationActions";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Customers } from "./Customers";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pages, setPages] = useState();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [customersList, setCustomersList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  useEffect(() => {
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    async function getAPICustomers(currentPage, perPage) {
      setLoading(true);
      try {
        const response = await apiService.getAllCustomers(currentPage, perPage);
        const { pages, page, customers } = response;
        setPages(pages);
        setCurrentPage(page);

        if (Array.isArray(customers)) {
          setCustomersList(customers); // !!! original (working) string
          //setTimeout(() => setCustomersList(customers), 1000); // For testing long loading   
        } else {
          setError(true);
          throw new Error('Неверные данные');
        }
      } catch (error) {
        if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
          logout(dispatch); // не обязательно, но желательно привести приложение в состояние LogOut
          navigate("/reLoginPage"); //TODO но лучше на страницу с предупреждением (чтобы не было неожиданностью почему так)
        }
        if (error instanceof ServerError) {
          navigate("/errorPage");
        }
      } finally {
        setLoading(false);
      }
    }

    setCustomersList(null);
    getAPICustomers(currentPage, perPage);
  }, [currentPage, perPage, dispatch, navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage])

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  const spinner = loading ? <div className='spinner'><Loading/></div> : null;
  const errorMessage = error ? <ErrorPage/> : null;
  const customers = customersList ? <Customers  customersList={customersList}
                                                currentPage={currentPage}
                                                pages={pages}
                                                setCurrentPage={setCurrentPage}
                                                perPage={perPage}
                                                setPerPage={setPerPage}/> : null;
  
  return (
    <div>
      {spinner}
      {errorMessage}
      {customers}
    </div>
  )
}

export {
  CustomersPage,
}