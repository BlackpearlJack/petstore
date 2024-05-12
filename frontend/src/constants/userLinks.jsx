// UserLinks.js
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/usersApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import adminLinks from './adminLinks';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserLinks({ userInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? 'text-gray-900' : 'text-gray-500',
                'group bg-white rounded-full inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              )}
            >
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Profile</span>
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <Link
                      to="/profile"
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <span className="sr-only">Sign out</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">Sign out</span>
                    </button>
                    {userInfo.isAdmin && adminLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.to}
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
