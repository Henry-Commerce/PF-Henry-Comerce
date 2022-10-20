/** @format */

import { useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdPayments } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions';
import { Orders } from '../../../components/Orders/Orders';



export const ModalsitoR = ({ modal, modalActive, user, dark }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(user.email));
  }, []);

  const ordenes = useSelector((state) => state.orders);

  return (
    <div className={`  ${modal ? `modal is-active` : 'modal'}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{user.username}</p>
          <button
            className='delete'
            aria-label='close'
            onClick={modalActive}></button>
        </header>
        <section className='modal-card-body'>
          <div
            className={`${
              dark ? 'has-background-black' : ''
            }card is-scrollable-height-medium`}>
            <header className='card-header'>
              <p className='card-header-title'>
                <span className='icon'>
                <MdPayments className='mdi mdi-animation-outline default' />
                  {/* <i ></i> */}
                </span>
                <span className={`${dark ? 'text-for-black' : ''}`}>
                  Orders
                </span>
              </p>
              <button type='button' className='button button is-small'>
                <span>
                  <span className='icon'>
                    <FiRefreshCcw className='mdi mdi-refresh default' />
                  </span>
                  <span>Refresh</span>
                </span>
              </button>
            </header>
            {/* <div
              className={`${
                dark ? 'notification-black' : 'notification'
              } is-card-toolbar is-upper is-upper`}>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    {console.log(ordenes)}
                    {ordenes > 0 ? (
                      <div className={`${dark ? 'text-for-black' : ''}`}>
                        {' '}
                        The purchase orders of this user have this status{' '}
                      </div>
                    ) : (
                      <div className={`${dark ? 'text-for-black' : ''}`}>
                        {' '}
                        This user has no purchase orders{' '}
                      </div>
                    )}
                  </div>
                </div>
                <div className='level-right'>
                  <div className='level-item'>
                    <span className='tag is-success'>
                      <span>All done</span>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='card-content'>
              {ordenes?.map((orders, index) => {
                return (
                  <Orders
                    key={index}
                    items={orders.items}
                    status={orders.payment.status}
                    paymentid={orders.payment.paymentid}
                  />
                );
              })}
              {/* <div className='media-list'>
                          <div
                            className='loading-overlay is-active'
                            style={{
                              display: 'none',
                            }}>
                            <div className='loading-background'></div>
                            <div className='loading-icon'></div>
                          </div>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dahlia Dibbert</strong>
                                  <small>@margarett.schmidt</small>
                                  <small className='has-text-grey'>
                                    22 hours ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Omnis excepturi sed quas occaecati. Vitae sed
                                  inventore consequuntur quos et. Nihil iste
                                  molestias ducimus quas natus qui.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Sigmund Abbott</strong>
                                  <small>@xdaniel</small>
                                  <small className='has-text-grey'>
                                    2 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Et quam aut aperiam expedita eos sit. Autem
                                  accusantium impedit debitis. Ea dolores at
                                  rerum. Dolorem et quia iusto modi non atque
                                  ea. Sunt ipsam sint aliquam eveniet quaerat
                                  et.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Hertha Simonis</strong>
                                  <small>@alverta.bernhard</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Optio laboriosam illo consectetur hic.
                                  Perspiciatis veritatis suscipit assumenda
                                  porro a vero necessitatibus ipsa.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Mrs. Elise Corwin I</strong>
                                  <small>@lisandro35</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Est in et aliquid mollitia. Nesciunt autem
                                  aspernatur veniam non. Ducimus et et
                                  voluptatibus voluptas aut. Aut est aliquid qui
                                  amet id.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dominique Douglas</strong>
                                  <small>@xwalker</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Possimus quas velit consequatur cumque minima
                                  et eos. Et ab ut et consequatur. Assumenda
                                  mollitia quas saepe ad adipisci error.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Dr. Abbie Hilpert II</strong>
                                  <small>@kathlyn.bogan</small>
                                  <small className='has-text-grey'>
                                    1 week ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Adipisci consequuntur nulla aut perferendis
                                  quidem non. Sed suscipit enim omnis ut quis
                                  quibusdam. Commodi dolor ut et velit ut.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Prof. Vince Orn DDS</strong>
                                  <small>@brady.cassin</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ut inventore a qui velit quia dolorem modi
                                  autem. Sit in a quos a sed iure delectus
                                  aperiam. Consectetur sint hic assumenda
                                  laborum quia repellat quas.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Gudrun Stark V</strong>
                                  <small>@zdooley</small>
                                  <small className='has-text-grey'>1 day ago</small>
                                </p>
                                <p>
                                  {' '}
                                  Iste officiis magnam voluptatibus quasi aut.
                                  Ut aperiam vitae quia dolore. Rem sit
                                  doloremque ut aliquam cupiditate et
                                  voluptatibus.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Hertha Simonis</strong>
                                  <small>@alverta.bernhard</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Ducimus doloribus autem maxime voluptatem
                                  eligendi aut aut. Velit unde accusamus
                                  blanditiis harum incidunt id iste. Dicta
                                  debitis eos non unde numquam.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Favian Turcotte</strong>
                                  <small>@zetta73</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Fuga eum veritatis placeat cumque rerum.
                                  Voluptates ullam id veritatis est a ullam.
                                  Maxime eos aut qui reiciendis accusantium et.
                                  Voluptatibus quis voluptatem est nihil
                                  recusandae.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Gudrun Stark V</strong>
                                  <small>@zdooley</small>
                                  <small className='has-text-grey'>
                                    5 days ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Qui architecto ut sequi quasi nesciunt
                                  perspiciatis deserunt facere. Quae ipsa
                                  exercitationem illo quia nostrum ex. Error aut
                                  odio est nihil aut dolor.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Lauriane Brakus</strong>
                                  <small>@xtremblay</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Consequuntur accusantium reprehenderit facilis
                                  deleniti tempora. Et perspiciatis quo atque
                                  id. Aut quam asperiores et temporibus odit.
                                  Delectus rem rerum autem et ipsum quo fugit.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Prof. Amelie Mann</strong>
                                  <small>@mario53</small>
                                  <small className='has-text-grey'>
                                    2 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Quaerat est saepe saepe corporis quia
                                  architecto vitae quia. Ut a incidunt nesciunt
                                  assumenda voluptatibus.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Werner Kuvalis</strong>
                                  <small>@hudson32</small>
                                  <small className='has-text-grey'>
                                    3 weeks ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Rerum quia repellendus nam aspernatur itaque
                                  quidem. Consequuntur architecto deserunt
                                  aliquam. Nesciunt ut et similique earum
                                  dolorem. Similique minus amet et dicta quis
                                  distinctio doloremque.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='media-meta'>
                                  <strong>Brandy Gleason</strong>
                                  <small>@rbashirian</small>
                                  <small className='has-text-grey'>
                                    1 month ago
                                  </small>
                                </p>
                                <p>
                                  {' '}
                                  Provident nulla nesciunt necessitatibus
                                  eligendi culpa tenetur blanditiis iusto.
                                  Itaque magni nihil rerum ut ut ipsam totam.
                                  Officia ut possimus earum molestias delectus
                                  recusandae dolorem veniam.{' '}
                                </p>
                              </div>
                            </div>
                            <div className='media-right'>
                              <button className='delete'></button>
                            </div>
                          </article>
                        </div> */}
            </div>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button className='button is-success'>Save changes</button>
          <button className='button' onClick={modalActive}>
            Cancel
          </button>
        </footer>
      </div>
    </div>

    // <div id='sample-modal' class={`  ${modal ? `modal is-active` : 'modal'}`}>
    //   <div class='modal-background jb-modal-close'></div>
    //   <div class='modal-card'>
    //     <header class='modal-card-head'>
    //       <p class='modal-card-title'>Confirm action</p>
    //       <button class='delete jb-modal-close' aria-label='close'></button>
    //     </header>
    //     <section class='modal-card-body'>
    //       <p>
    //         This will permanently delete <b>{user.country}</b>
    //       </p>
    //       <p>{user.username}</p>
    //     </section>
    //     <footer class='modal-card-foot'>
    //       <button class='button jb-modal-close'>Cancel</button>
    //       <button class='button is-danger jb-modal-close'>Delete</button>
    //     </footer>
    //   </div>
    //   <button
    //     class='modal-close is-large jb-modal-close'
    //     aria-label='close'
    //     onClick={modalActive}></button>
    // </div>
  );
};
