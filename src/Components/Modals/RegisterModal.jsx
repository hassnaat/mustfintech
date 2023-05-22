import React, { useEffect, useState } from "react";
import "./Modals.css";
import CloseIcon from "../../assets/icons/close.svg";
import CloseFilledIcon from "../../assets/icons/close-filled.svg";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const investmentTypes = [
  { value: "일반개인", label: "일반개인" },
  { value: "소득적격", label: "소득적격" },
  { value: "개인전문", label: "개인전문" },
  { value: "법인", label: "법인" },
  { value: "여신금융", label: "여신금융" },
  { value: "P2P온투", label: "P2P온투" },
];
const initialData = {
  member_number: "",
  member_name: "",
  investment_type: "",
  documents: "",
};

const RegisterModal = ({ isOpen, handleClose, setPopup }) => {
  const [investmentOption, setInvestmentOption] = useState(investmentTypes[0]);
  const [files, setFiles] = useState([]);
  const [fileSize, setFileSize] = useState(null);
  const [fileFormat, setFileFormat] = useState(null);
  const [data, setData] = useState(initialData);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const updatedFiles = Array.from(selectedFiles);

    if (updatedFiles.length > 0) {
      setFiles(updatedFiles);
      setFileSize(updatedFiles.map((file) => file.size));
      setFileFormat(updatedFiles.map((file) => file.type));
    }
  };

  const allowedFormats = [
    "image/jpg",
    "image/JPG",
    "image/PNG",
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];

  const validateFile = () => {
    if (files.length === 0) {
      return "필수입력항목을 입력해주세요.";
    }
    if (files.length > 10) {
      return "최대 10개까지 등록 가능합니다.";
    }
    if (fileSize.some((size) => size > 100000000)) {
      return "최대 100MB까지 등록 가능합니다.";
    }

    if (fileFormat.some((format) => !allowedFormats.includes(format))) {
      return "jpg, jpeg, gif, png, pdf 파일만 등록 가능합니다.";
    }

    return false;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = () => {
    const notValid = validateFile();
    if (notValid) {
      setPopup({
        text: notValid,
        type: "warning",
      });
      return;
    }
    const formData = new FormData();

    formData.append("member_number", data.member_number);
    formData.append("member_name", data.member_name);
    formData.append("investment_type", investmentOption);
    formData.append("documents", files);
    setPopup({
      text: "저장되었습니다.",
      type: "success",
    });
  };
  const handleImageRemove = (file) => {
    setFiles((files) => {
      return files.filter((item) => item.name !== file.name);
    });
  };
  return (
    <>
      {isOpen && (
        <div className="modal__backdrop">
          <div className="regmodal__content">
            <div className="regmodal__content_header">
              <span className="regmodal__header_heading" onClick={handleClose}>
                투자유형 변경
              </span>
              <button className="modal__close" onClick={handleClose}>
                <img src={CloseIcon} alt="" />
              </button>
            </div>

            <div className="regmodal__content_body">
              <div className="regmodal__content_grid">
                <div className="regmodal__content_gitemdark">회원번호</div>
                <div className="regmodal__content_gitemlight">
                  <input
                    type="text"
                    placeholder="회원번호"
                    name="member_number"
                    onChange={handleChange}
                  />
                </div>
                <div className="regmodal__content_gitemdark">회원명/법인명</div>
                <div className="regmodal__content_gitemlight">
                  <input
                    type="text"
                    placeholder="회원명/법인명"
                    name="member_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="regmodal__content_gitemdark">
                  투자유형<span className="regmodal__content_gdbadge"></span>
                </div>
                <div
                  className="regmodal__content_gitemlight"
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                  <CustomDropdown
                    width="282px"
                    options={investmentTypes}
                    selectedOption={investmentOption}
                    setSelectedOption={(opt) => {
                      setPopup({
                        text: "투자유형을 변경하시겠습니까?",
                        type: "warning",
                        action: () => {
                          setInvestmentOption(opt);
                        },
                        choice: true,
                      });
                    }}
                  />
                </div>
                <div className="regmodal__content_gitemdark">
                  서류첨부 <span className="regmodal__content_gdbadge"></span>
                </div>
                <div className="regmodal__content_gitemlight">
                  <div className="regmodal__content_gilimgslist">
                    <label
                      htmlFor="document-input"
                      className="choose__file_button"
                    >
                      <input
                        type="file"
                        id="document-input"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept={allowedFormats.join(",")}
                        multiple
                      />
                      <span>파일 선택</span>
                    </label>
                    {files?.map((file) => (
                      <div
                        className="regmodal__content_gilimgwrap"
                        key={file.name}
                      >
                        {file.name}
                        <img
                          src={CloseFilledIcon}
                          alt=""
                          onClick={() => handleImageRemove(file)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <ul className="regmodal__content_instructions">
                <li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
                <li>최대 10개, 100MB까지 등록이 가능합니다.</li>
              </ul>
            </div>
            <div className="regmodal__content_footer">
              <button
                className="popup__content_fbtnfilled"
                onClick={handleSubmit}
              >
                확인
              </button>
              <button
                className="popup__content_fbtnoutlined"
                onClick={handleClose}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
