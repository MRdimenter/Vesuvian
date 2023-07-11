import { useEffect, useState } from "react"
import { OAuth2Service } from "../../common/utils/OAuth2Service";
import { ApiService } from "../../common/utils/ApiService";
import { BadRequestError, RefreshTokenMissingError, ServerError } from "../../common/utils/Errors/Errors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationAction } from "../../store/actions/authenticationActions";
import { Button } from "../Button/Button";

const ListItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const apiService = useCallback(() => new ApiService(oauthService),[oauthService]);

  const [customersList, setCustomersList] = useState(null);
  const [page, setPage] = useState(1);

  function renderItems(arr) {
    console.log('!!!!arr: ', arr);
    return arr.map((customer) => {
      return (
        <li className="list=item"
          key={customer.id}>
          {customer.username}
        </li>
      )
    })
  }

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  /*
      const getAPICustomers = useCallback(async () => {
          try {
              let customersList = await apiService.getAllCustomers(page);
              //setCustomersList(customersList); // original (working) string
              setTimeout(() => setCustomersList(customersList), 1000); // For testing long loading
          } catch (error) {
              if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
                  logout(dispatch); // не обязательно, но желательно привести приложение в состояние LogOut
                  navigate("/reLoginPage"); //TODO но лучше на страницу с предупреждением (чтобы не было неожиданностью почему так)
              }
              if (error instanceof ServerError) {
                  navigate("/errorPage");
              }
          }
      }, [page])
  */
  useEffect(() => {
    console.log('useEffect');
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    async function getAPICustomers(currentPage) {
      console.log('&&&&&&');
      try {
        const response = await apiService.getAllCustomers(currentPage);
        const { pages, page, customers} = response;
        if (Array.isArray(customers)) {
          setCustomersList(customers); // !!! original (working) string
          //setTimeout(() => setCustomersList(customers), 1000); // For testing long loading   
        } else {
          throw new Error('Неверные данные');
        }
        
      } catch (error) {
        if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
          console.log('!!!!!!!!!!!');
          logout(dispatch); // не обязательно, но желательно привести приложение в состояние LogOut
          navigate("/reLoginPage"); //TODO но лучше на страницу с предупреждением (чтобы не было неожиданностью почему так)
        }
        if (error instanceof ServerError) {
          navigate("/errorPage");
        }
      }
    }

    console.log('here');

    setCustomersList(null);
    getAPICustomers(page);
  }, [page, dispatch, navigate]);

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  function handleSubmit(selectedPage) {
    console.log('click');
    setPage(selectedPage);
  }

  if (customersList) {
    const items = renderItems(customersList)

    return (
      <div>
        <Button btnStyle='btn' label='1' action={e => handleSubmit(e.target.textContent)} />
        <Button btnStyle='btn' label='2' action={e => handleSubmit(e.target.textContent)} />
        <ul>
          {items}
        </ul>
      </div>
    )

  } else {
    return <Loading />;
  }

}

export {
  ListItem,
}