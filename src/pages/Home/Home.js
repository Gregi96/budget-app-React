import React from 'react';

import { Content, Title, Text } from './Home.css';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <Title>{t('Budget management website')}</Title>
      <Text>
        {t(`This App allow you menage budget and save history of transactions`)}
      </Text>
    </Content>
  );
};

export default Home;
