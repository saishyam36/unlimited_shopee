import React, { useEffect } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminTabs.css';

const AdminTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.startsWith('/add')) {
            navigate('/add', { replace: true });
        }
    }, []);

    const items = [
        {
            key: '1',
            label: <NavLink to="/add">Add Products</NavLink>,
            children: null,
        },
        {
            key: '2',
            label: <NavLink to="/list">List Products</NavLink>,
            children: null
        },
        {
            key: '3',
            label: <NavLink to="/orders">Orders Management</NavLink>,
            children: null,
        },
    ];

    useEffect(() => {

    }, []); // Empty dependency array to run only once on mount

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'black',
                },
                components: {
                    Tabs: {
                        titleColor: 'black',
                        titleHoverColor: 'white',
                        titleActiveColor: 'white',
                        colorBgContainer: 'white', // Background color of the tab container
                        itemActiveBg: 'black', // Background color of the active tab
                        itemHoverBg: 'black', // Background color of the hovered tab
                        itemHoverColor: 'black', // Text color of the hovered tab
                        itemActiveColor: 'white', // Text color of the active tab
                        itemColor: 'black', // Text color of the inactive tab
                    },
                },
            }}
        >
            <div className="flex items-center justify-between py-2 font-sans">
                <Tabs
                    tabBarGutter={32}
                    tabBarStyle={{
                        borderRight: '1px solid #d9d9d9', // Vertical divider
                        padding: '16px 0', // Vertical padding for the tab labels
                        display: 'flex',
                        flexDirection: 'column', // Arrange tabs vertically
                        alignItems: 'flex-end', // Align labels to the start
                    }}
                    tabPosition="left"
                    type="card"
                    size="large"
                    style={{ marginBottom: 40, minWidth: 200 }}
                    items={items}
                />

            </div>
        </ConfigProvider>
    )
}

export default AdminTabs;