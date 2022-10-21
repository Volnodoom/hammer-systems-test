import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import UsersData from './UsersData';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    usersData: UsersData,
});

export default reducers;