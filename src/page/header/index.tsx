import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd';
import { NavLink } from "react-router";
import { MenuItemEntity, MenuModeEntity, MenuThemeEntity } from '../enum';
import styles from './index.module.scss'
import { useThemeContext } from '../../themeContext';


const Header: React.FC = () => {

  const { isDarkMode } = useThemeContext()
  const [selectedKey, setSelectedKey] = useState<string>(MenuItemEntity.HOME);

  const menuItems: MenuProps['items'] = Object.values(MenuItemEntity).map((item: string) => ({
    key: item,
    label: <NavLink to={`/${item.toLowerCase()}`}>{item}</NavLink>,
  }))

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
  };


  return (
    <Layout.Header className={styles.container} style={{ display: 'flex', alignItems: 'center' }} >
      {/* <div className={styles.headerCenter}>
        <div className={styles.headerText} >Gautam Homestay</div>
      </div> */}
      <div className="demo-logo" >Gautam Homestay</div>
      <Menu
        theme={isDarkMode ? MenuThemeEntity.DARK : MenuThemeEntity.LIGHT}
        mode={MenuModeEntity.HORIZONTAL}
        selectedKeys={[selectedKey]}
        items={menuItems}
        // style={{ flex: 1, minWidth: 0 }}
        onClick={handleMenuClick}
      />

      <div className={styles.headerRight}>
        <div >call</div>
      </div>
    </Layout.Header>
  )
}

export default Header