/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AdminNav, Loading } from '../../../components';
import './main.scss';
import { BiTachometer } from 'react-icons/bi';

export const AdminDashboard = () => {
  const [numberUsers, setNumberUsers] = useState(false);
  const [numberAdmins, setNumberAdmins] = useState(false);
  const [numberAccounts, setNumberAccounts] = useState(false);
  const [day, setDay] = useState(false);

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
    };
    users();
  }, []);

  return (
    <div className='wrapper'>
      {numberUsers === false && numberAdmins === false && <Loading />}
      <div className='columns'>
        <AdminNav />
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
