import React from 'react';
import { Link } from 'react-router-dom';
import locales from '../../locales/historial';

const activeClass = 'history-toggle-btn history-toggle-btn--selected';
const notActiveClass = 'history-toggle-btn';

const HistorySearchContainer = ({
    pathname,
    searchVideosByTerm,
    search,
    liftUpState,
    openConfirmModal,
}) => {
    return (
        <div className="history-search-container">
            {pathname === '/feed/history' && (
                <div className={'history-search-input-container'}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            searchVideosByTerm();
                        }}
                    >
                        <input
                            value={search}
                            onChange={(e) => liftUpState(e.target.value)}
                            type="text"
                            placeholder={locales.manage.inputPlaceholder}
                        />
                    </form>
                    <i
                        onClick={searchVideosByTerm}
                        className={'fa fa-search'}
                    />
                    <div className={'history-input-active'}>
                        <div />
                    </div>
                </div>
            )}
            <h4>{locales.manage.type}</h4>
            <div className="history-types-container">
                <Link to="/feed/history" className="history-type-container">
                    <span>{locales.manage.watch}</span>
                    <div
                        className={
                            pathname === '/feed/history'
                                ? activeClass
                                : notActiveClass
                        }
                    >
                        <div />
                    </div>
                </Link>
                <Link
                    to="/feed/history/search_history"
                    className="history-type-container"
                >
                    <span>{locales.manage.search}</span>
                    <div
                        className={
                            pathname === '/feed/history/search_history'
                                ? activeClass
                                : notActiveClass
                        }
                    >
                        <div />
                    </div>
                </Link>
                <Link
                    to="/feed/history/comments_history"
                    className="history-type-container"
                >
                    <span>{locales.manage.comments}</span>
                    <div
                        className={
                            pathname === '/feed/history/comments_history'
                                ? activeClass
                                : notActiveClass
                        }
                    >
                        <div />
                    </div>
                </Link>
                <Link
                    to="/feed/history/community_history"
                    className="history-type-container"
                >
                    <span>{locales.manage.community}</span>
                    <div
                        className={
                            pathname === '/feed/history/community_history'
                                ? activeClass
                                : notActiveClass
                        }
                    >
                        <div />
                    </div>
                </Link>
                <Link
                    to="/feed/history/live_chat_history"
                    className="history-type-container"
                >
                    <span>{locales.manage.chat}</span>
                    <div
                        className={
                            pathname === '/feed/history/live_chat_history'
                                ? activeClass
                                : notActiveClass
                        }
                    >
                        <div />
                    </div>
                </Link>
            </div>
            <div className="activity_manager-container">
                <span onClick={openConfirmModal}>
                    {pathname === '/feed/history'
                        ? locales.manage.buttons.clear.watch
                        : locales.manage.buttons.clear.search}
                </span>
                <span>
                    {pathname === '/feed/history'
                        ? locales.manage.buttons.pause.watch
                        : locales.manage.buttons.pause.search}
                </span>
                <span>{locales.manage.buttons.activity}</span>
            </div>
        </div>
    );
};

export default HistorySearchContainer;
