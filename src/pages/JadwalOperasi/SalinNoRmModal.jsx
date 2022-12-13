import React from "react";
import BaseModal from "../../layouts/BaseModal";

export default function SalinNoRmModal({ handleCloseSalinModal }) {
  return (
    <>
      <BaseModal heading="Salin No. RM" handleClose={handleCloseSalinModal}>
        <p>...Some Content Rm</p>
      </BaseModal>
    </>
  );
}
