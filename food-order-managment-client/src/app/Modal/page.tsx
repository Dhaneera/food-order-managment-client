'use client';

import React, { useState } from 'react';
import Modal from '../components/Modal';
import UserHeader from '../components/UserHeader';
import GuessModal from '../components/GuessUserModal';

const ModalPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <div className="p-6">
      <UserHeader onSettingsClick={handleOpenModal} />
      <Modal
        title="User Settings"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onDiscard={() => setModalVisible(false)}
        onSubmit={() => setModalVisible(false)}
      />
      <GuessModal/>
    </div>
  );
}
export default ModalPage;