import { Link } from 'react-router-dom';
import studyPlannerLogo from '../assets/study-planner-logo.png';
import settingIcon from '../assets/setting-icon.png';
const Header = () => {
    const todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <nav className="bg-gray-800 sticky top-0 z-50 shadow-sky-950 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
            <div className=" inset-y-0 left-0 flex items-center">
              <Link to="/" className="flex shrink-0 items-center">
                <img src={studyPlannerLogo} className="h-8 w-auto logo" alt="Study Planner" />
                <h1 className='pl-3 font-bold'>STUDY PLANNER</h1>
              </Link>
            </div>
            <div className="flex items-center self-center-safe gap-4">
              <h2>Welcome to your study planner!</h2>
              <h3 className='p-2 text-blue-400'>{todayDate}</h3>
            </div>
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/setting" className="rounded-md px-3 py-2 text-sm font-medium text-white">
                <img src={settingIcon} className="setting-icon pr-2" alt="Setting" />
                <span>Setting</span>
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;