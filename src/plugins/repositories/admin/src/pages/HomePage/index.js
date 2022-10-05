import styled from "styled-components";
import React from "react";
import { BaseHeaderLayout, HeaderLayout } from "@strapi/design-system/Layout";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";

const Wrapper = styled.div`
  padding: 18px 30px;
`;

const HomePage = () => {
  return (
    <HeaderLayout
      title="React Avançado Repositories"
      subtitle="Uma lista dos repositorios do curso."
    />
  );
};

export default HomePage;
