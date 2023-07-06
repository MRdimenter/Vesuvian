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
        const oauthService = new OAuth2Service();
        const apiService = new ApiService(oauthService);
        
        async function getAPICustomers(page) {
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
        }

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
                <ul>
                    {items}
                </ul>
                <Button btnStyle='btn' label='1' action={e=>handleSubmit(e.target.textContent)} />
                <Button btnStyle='btn' label='2' action={e=>handleSubmit(e.target.textContent)} />
            </div>
        )

    } else {
        return <Loading />;
    }

}

export {
    ListItem,
}