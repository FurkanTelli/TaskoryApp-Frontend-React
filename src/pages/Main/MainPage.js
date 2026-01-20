import ToolbarComponent from '../../components/ToolbarConponent/ToolbarComponent';
import "./MainPage.css";
import SidebarComponent from '../../components/Sidebar/SidebarComponent';
import { useSelector } from 'react-redux';
import { Divider } from 'primereact/divider';


const MainPage = () => {
    const isLoggedIn = useSelector(state => state?.userStore?.isLogin);
    const myTheme = useSelector(state => state?.userStore?.theme);


    return (
        <div className='main-content'>
            <div className='flex align-items-center p-2 content-divs'>
                <img src='/images/time-management-concept-landing-page.png' className='divider-imgs' alt="Time Management" />
                <p>
                    <strong>Taskory</strong> empowers you to take full control of your daily workflow.
                    Designed for efficiency, our platform helps you organize your responsibilities
                    in one central hub, ensuring that no deadline is ever missed and every minute
                    of your day is utilized to its full potential.
                </p>
            </div>
            <div className='flex align-items-center p-2 mid-content-div'>
                <p>
                    Streamline your productivity with our intuitive management tools.
                    With Taskory, you can effortlessly <strong>create</strong> new objectives,
                    <strong> update</strong> your plans as things change, and <strong>remove </strong>
                    items that are no longer needed. It is a flexible checklist built to adapt
                    to your dynamic lifestyle.
                </p>
                <img src='/images/checklist.png' className='divider-imgs' alt="Checklist" />
            </div>
            <div className='flex align-items-center p-2 last-content-div'>
                <img src='/images/schedule.png' className='divider-imgs' alt="Schedule" />
                <p>
                    Stay informed about your progress at a single glance. Categorize your tasks into
                    three core stages: <strong>Not Started</strong>, <strong>In Progress</strong>, or
                    <strong> Completed</strong>. Visualizing your journey from start to finish has
                    never been easier, helping you stay motivated and focused on your goals.
                </p>
            </div>
        </div>
    )
}

export default MainPage