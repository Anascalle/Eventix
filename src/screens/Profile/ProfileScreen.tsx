import React from 'react'; 
import UserProfile from '../../components/Profile/profile';

const Main: React.FC = () => {
 // const { userId } = useParams<{ userId: string; eventId: string }>();
    return (
        <div id='main_screen'>
    <UserProfile></UserProfile>
        </div>
    );
};

export default Main;