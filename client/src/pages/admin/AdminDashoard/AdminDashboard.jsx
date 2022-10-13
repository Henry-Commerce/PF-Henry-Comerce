/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Loading } from '../../../components';
import { Link, useLocation } from 'react-router-dom';
import './main.scss';
import { BiTachometer } from 'react-icons/bi';
import { FaTable } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { IoMenuSharp } from 'react-icons/io5';

export const AdminDashboard = () => {
  const [numberUsers, setNumberUsers] = useState(false);
  const [numberAdmins, setNumberAdmins] = useState(false);
  const [numberAccounts, setNumberAccounts] = useState(false);
  const [day, setDay] = useState(false);

  const location = useLocation();
  const [active, setActive] = useState('');

  var hoy = new Date();
  var fecha =
    hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

  useEffect(() => {
    const users = async () => {
      const users = await axios.get(`http://localhost:3001/api/user/info`);
      const admis = await axios.get(
        `http://localhost:3001/api/user/adminsinfo`
      );
      setNumberAdmins(admis.data.length);
      // console.log(numberAdmins);

      setNumberUsers(users.data.length);
      // console.log(numberUsers);

      setNumberAccounts(admis.data.length + users.data.length);
      // console.log(numberAccounts);

      setDay(fecha);
      if (location.pathname === '/admin') {
        setActive('dashboard');
      }
    };
    users();
  }, []);

  return (
    <div className='wrapper'>
      {numberUsers === false && numberAdmins === false && <Loading />}
      <div className='columns'>
        {/* <aside className='column is-2 aside'>
          <nav className='menu'>
            <p className='menu-label'>General</p> 
            <ul className='menu-list pt-2'>
              <li>
                <a className='is-active' href='#'>
                  <span className='icon is-small'>
                    <i className='fa fa-tachometer'></i>
                  </span>{' '}
                  Dashboard
                </a>
              </li>
            </ul>
            <p className='menu-label pl-4'>Administration</p>
            <ul className='menu-list'>
              <li>
                <a href='/bulma-admin-dashboard-template/forms.html'>
                  <span className='icon is-small'>
                    <i className='fa fa-pencil-square-o'></i>
                  </span>{' '}
                  Forms
                </a>
              </li>
              <li>
                <a href='/bulma-admin-dashboard-template/ui-elements.html'>
                  <span className='icon is-small'>
                    <i className='fa fa-desktop'></i>
                  </span>{' '}
                  UI Elements
                </a>
              </li>
              <li>
                <a href='/bulma-admin-dashboard-template/tables.html'>
                  <span className='icon is-small'>
                    <i className='fa fa-table'></i>
                  </span>{' '}
                  Tables
                </a>
              </li>
              <li>
                <a href='/bulma-admin-dashboard-template/presentations.html'>
                  <span className='icon is-small'>
                    <i className='fa fa-bar-chart'></i>
                  </span>{' '}
                  Presentations
                </a>
              </li>

              <li>
                <a className=''>
                  <i className='fa fa-cog'></i> Settings
                </a>
                <ul>
                  <li>
                    <a>Members</a>
                  </li>
                  <li>
                    <a>Plugins</a>
                  </li>
                  <li>
                    <a>Add a member</a>
                  </li>
                </ul>
              </li>
            </ul>
            <p className='menu-label pl-4'>Live On</p>
            <ul className='menu-list'>
              <li>
                <a>
                  <span className='icon is-small'>
                    <i className='fa fa-bug'></i>
                  </span>{' '}
                  Additional Pages
                </a>
              </li>
              <li>
                <a>
                  <span className='icon is-small'>
                    <i className='fa fa-windows'></i>
                  </span>{' '}
                  Extras
                </a>
              </li>
              <li>
                <a>
                  <span className='icon is-small'>
                    <i className='fa fa-laptop'></i>
                  </span>{' '}
                  Landing Page
                </a>
              </li>
            </ul>
          </nav>
        </aside> */}

        {/* <aside class='column is-2 aside main-sidebar'>
          <section class='sidebar'>
            <ul class='sidebar-menu'>
              <li class='header'>Profile</li>
              <li class='treeview'>
                <a href='#'>
                  <i class='fa fa-files-o'></i> <span>Dashboard</span>
                </a>
                <ul class='treeview-menu'>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Dashboard 一 v1
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Dashboard 一 v2
                    </a>
                  </li>
                </ul>
              </li>
              <li class='treeview'>
                <a href='#'>
                  <i class='fa fa-files-o'></i>
                  <span>Component</span>
                </a>
                <ul
                  class='treeview-menu'
                  style={{
                    display: 'none',
                  }}>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Box
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Button
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Content
                    </a>
                  </li>
                  <li class=''>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Icon
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href='#'>
                  <i class='fa fa-files-o'></i> <span>Element</span>
                </a>
                <ul class='treeview-menu'>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i>Breadcumb
                    </a>
                  </li>
                </ul>
              </li>
              <li class='treeview'>
                <a href='#'>
                  <i class='fa fa-files-o'></i>
                  <span>Form</span>
                </a>
                <ul class='treeview-menu'>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> General
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Input
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Text Area
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Select
                    </a>
                  </li>
                </ul>
              </li>
              <li class='treeview'>
                <a href='#'>
                  <i class='fa fa-files-o'></i>
                  <span>Columns</span>
                </a>
                <ul class='treeview-menu'>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Basics
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Size
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Responsive
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Nesting
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='fa fa-circle-o'></i> Gap
                    </a>
                  </li>
                  <li>
                    <li class='treeview'>
                      <a href='#'>
                        <i class='fa fa-files-o'></i>
                        <span>Layout</span>
                      </a>
                      <ul class='treeview-menu'>
                        <li>
                          <a href='#'>
                            <i class='fa fa-circle-o'></i> Container
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <i class='fa fa-circle-o'></i> Level
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <i class='fa fa-circle-o'></i> Hero
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <i class='fa fa-circle-o'></i> Section
                          </a>
                        </li>
                      </ul>
                    </li>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </aside> */}

        <aside className='column is-2 aside is-placed-left is-expanded '>
          <div className='menu is-menu-main'>
            <p className='pb-1'></p>
            <ul className='menu-list'>
              <li>
                <a href='#' className='is-active router-link-active has-icon'>
                  <span className='icon'>
                    <i className='mdi mdi-desktop-mac'></i>
                  </span>
                  <span className='menu-item-label'>Dashboard</span>
                </a>
              </li>
            </ul>
            <p className='menu-label pr-1'>Administration</p>
            <ul className='menu-list'>
              <li>
                <a href='#' className='has-icon'>
                  <span className='icon has-update-mark'>
                    {/* <i className='mdi mdi-table'></i> */}
                    <FaTable />
                  </span>
                  <span className='menu-item-label'>Tables</span>
                </a>
              </li>

              <li>
                <a href='#' className='has-icon'>
                  <span className='icon has-update-mark'>
                    {/* <i className='mdi mdi-table'></i> */}
                    <IoMdAdd />
                  </span>
                  <span className='menu-item-label'>Add new product</span>
                </a>
              </li>

              <li>
                <a href='#' className='has-icon'>
                  <span className='icon has-update-mark'>
                    {/* <i className='mdi mdi-table'></i> */}

                    <CgProfile />
                  </span>
                  <span className='menu-item-label'>Profile</span>
                </a>
              </li>

              <li className='is-active'>
                <a className='has-icon has-dropdown-icon'>
                  <span className='icon'>
                    <IoMenuSharp className='mdi mdi-view-list' />
                  </span>
                  <span className='menu-item-label'>Submenus</span>
                  <div className='dropdown-icon'>
                    <span className='icon'>
                      <i className='mdi mdi-plus'></i>
                    </span>
                  </div>
                </a>
                <ul>
                  <li>
                    <a href='#void'>
                      <span>Sub-item One</span>
                    </a>
                  </li>
                  <li>
                    <a href='#void'>
                      <span>Sub-item Two</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <p className='menu-label'>About</p>
            <ul className='menu-list'>
              <li>
                <a
                  href='https://github.com/AlyxZain'
                  target='_blank'
                  className='has-icon'>
                  <span className='icon'>
                    <i className='mdi mdi-github-circle'></i>
                  </span>
                  <span className='menu-item-label'>GitHub</span>
                </a>
              </li>
              <li>
                <a href='#' className='has-icon'>
                  <span className='icon'>
                    <i className='mdi mdi-help-circle'></i>
                  </span>
                  <span className='menu-item-label'>About</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main className='column main '>
          {/* <nav className='breadcrumb is-small pt-3' aria-label='breadcrumbs'>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li className='is-active'>
                <a href='#' aria-current='page'>
                  Dashboard
                </a>
              </li>
            </ul>
          </nav> */}

          <div className='level'>
            <div className='level-left'>
              <div className='level-item'>
                <div className='title '>
                  <BiTachometer
                    className='fab pt-5'
                    style={{
                      height: '50px',
                    }}
                  />

                  <span> Dashboard</span>

                  {/* <i className='fa fa-tachometer'></i>  */}
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <button type='button' className='button is-small'>
                  {day}
                </button>
              </div>
            </div>
          </div>

          <div className='columns is-multiline'>
            <div className='column'>
              <div
                className='box notification is-yellow'
                style={{
                  marginTop: '10px',
                }}>
                <div className='heading'>Top Seller Total</div>
                <div className='title'>56,950</div>
                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Sales $</div>
                      <div className='title is-5'>250K</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Overall $</div>
                      <div className='title is-5'>750K</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Sales %</div>
                      <div className='title is-5'>25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column '>
              <div
                className='box notification is-warning'
                style={{
                  marginTop: '10px',
                }}>
                <div className='heading'>Accounts</div>
                <div className='title'>{numberAccounts}</div>

                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading '>Users</div>
                      <div className='title is-5'>{numberUsers}</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading '>Admins</div>
                      <div className='title is-5'>{numberAdmins}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div
                className='box notification is-info'
                style={{
                  marginTop: '10px',
                }}>
                <div className='heading'>Feedback Comments</div>
                <div className='title'>78% &uarr;</div>
                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Pos</div>
                      <div className='title is-5'>1560</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Neg</div>
                      <div className='title is-5 '>368</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div
                className='box notification is-danger'
                style={{
                  marginTop: '10px',
                }}>
                <div className='heading'>Orders / Returns</div>
                <div className='title'>75% / 25%</div>
                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Orders $</div>
                      <div className='title is-5'>425K</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Returns $</div>
                      <div className='title is-5'>106K</div>
                    </div>
                  </div>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Success %</div>
                      <div className='title is-5'>+ 28,5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='columns is-multiline'>
            <div className='column is-6'>
              <article className='message is-dark'>
                <div className='message-header'>
                  <p>Chart</p>
                </div>
                <div className='message-body'>
                  <div
                    id='chartLine'
                    style={{
                      width: '100%',
                    }}></div>
                </div>
              </article>
            </div>
            <div className='column is-6'>
              <article className='message is-dark'>
                <div className='message-header'>
                  <p>Chart</p>
                </div>
                <div className='message-body'>
                  <div
                    id='chartScatter'
                    style={{
                      width: '100%',
                    }}></div>
                </div>
              </article>
            </div>
            <div className='column is-6'>
              <article className='message is-dark'>
                <div className='message-header'>
                  <p>Chart</p>
                </div>
                <div className='message-body'>
                  <div
                    id='chartDoughnut'
                    style={{
                      width: '100%',
                    }}></div>
                </div>
              </article>
            </div>
            <div className='column is-6'>
              <article className='message is-dark'>
                <div className='message-header'>
                  <p>Chart</p>
                </div>
                <div className='message-body'>
                  <div
                    id='chartBar'
                    style={{
                      width: '100%',
                    }}></div>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
