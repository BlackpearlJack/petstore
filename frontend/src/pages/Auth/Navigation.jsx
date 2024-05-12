import { Fragment} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import images from "../../constants/images"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);            
        }
    }

  return (
    <Disclosure as="nav" className="bg-[#38023b]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-[#d9b2b2] hover:bg-[#d9b2b2] hover:text-[#d9b2b2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d9b2b2]">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto rounded-full"
                    src={images.logo}
                    alt="pawsupplies" 
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-[#d9b2b2] text-[#5a7684]">
                      <span className="mt-[3rem]">Shop</span>
                    </Link>
                    <Link to="/cats" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-[#d9b2b2] text-[#5a7684]">
                      <span className="mt-[3rem]">Cats</span>
                    </Link>
                    <Link to="/dogs" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-[#d9b2b2] text-[#5a7684]">
                      <span className="mt-[3rem]">Dogs</span>
                    </Link>
                    <Link to="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-[#d9b2b2] text-[#5a7684]">
                      <span className="mt-[3rem]">Pawsupplies</span>
                    </Link> 
                  </div>
                </div>
              </div>
              <div className="absolute justify-between inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link 
                  to="/cart" 
                  className="p-1 text-[#d9b2b2] hover:text-[#d9b2b2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d9b2b2]"
                >                  
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </Link>

                {userInfo && (
                  // If user is logged in, show profile dropdown
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d9b2b2]">
                        <span className="absolute -inset-1.5"/>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userInfo.isAdmin &&(
                              <>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin/dashboard"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Dashboard
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin/productlist"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Products
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin/categorylist"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Category
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin/orderlist"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Orders
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin/userlist"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Users
                                    </Link>
                                    )}
                                </Menu.Item>
                              </>
                          )}
                          <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={logoutHandler}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                
                {/* If user is not logged in, show login link */}
                {!userInfo && (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#5a7684]">
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}

              </div>              
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#38023b] hover:bg-[#d9b2b2]">
                Shop
              </Link>
              <Link to="/cats" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#38023b] hover:bg-[#d9b2b2]">
                Cats
              </Link>
              <Link to="/dogs" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#38023b] hover:bg-[#d9b2b2]">
                Dogs
              </Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#38023b] hover:bg-[#d9b2b2]">
                Pawsupplies
              </Link>
              {userInfo ? (
                <> </>
              ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#38023b] hover:bg-[#d9b2b2]">
                  Login
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navigation
