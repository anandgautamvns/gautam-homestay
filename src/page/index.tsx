import React, { createContext, useContext, useState } from 'react';

import Header from './header';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './home';
import About from './about';
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, theme as antTheme, Switch } from "antd";
import { ThemeDataEntity } from './type';
import { useThemeContext } from '../themeContext';

const { Content } = Layout;

const Page: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useThemeContext()

  const defaultData: ThemeDataEntity = {
    colorPrimary: isDarkMode ? "#1890ff" : "#722ed1", // Blue in dark mode, Purple in light mode
    colorBgBase: isDarkMode ? "#141414" : "#ffffff",
    colorTextBase: isDarkMode ? "#ffffff" : "#000000",
    Button: {
      colorPrimary: '#00B96B',
    },
  };

  // Define Theme Configurations
  const themeConfig = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: isDarkMode ? "#1890ff" : "#722ed1", // Blue in dark mode, Purple in light mode
      colorBgBase: isDarkMode ? "#141414" : "#ffffff",
      colorTextBase: isDarkMode ? "#ffffff" : "#000000",

    },
    components: {
      Layout: {
        headerBg: isDarkMode ? '#001529' : '#fff',
        headerColor: isDarkMode ? '#fff' : "#001529",
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter basename='/'>
        <Layout>
          <Header />
          <Content style={{ padding: '0 48px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter >
      <Switch
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        style={{ marginTop: 20 }}
      />
    </ConfigProvider>
  );
};

export default Page;