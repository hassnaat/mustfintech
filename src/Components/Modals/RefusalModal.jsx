import React, { useState } from "react";
import "./Modals.css";
import CloseIcon from "../../assets/icons/close.svg";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const reasons = [
  { value: "서류 식별 불가", label: "서류 식별 불가" },
  { value: "필수 서류 누락", label: "필수 서류 누락" },
  {
    value: "서류의 내용이 등록된 회원정보와 다름",
    label: "서류의 내용이 등록된 회원정보와 다름",
  },
  {
    value:
      "서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인, 본인서명 등)",
    label:
      "서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인, 본인서명 등)",
  },
  { value: "서류의 유효기간이 초과됨", label: "서류의 유효기간이 초과됨" },
  { value: "직접 입력", label: "직접 입력" },
];

const initialData = {
  member_number: "",
  member_name: "",
  refusal_reasons: [],
  refusal_other_reason: "",
};

const RefusalModal = ({ isOpen, handleClose, setPopup }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleReasonChecbox = (value) => {
    let resns = data.refusal_reasons;
    const index = resns.indexOf(value);
    if (index > -1) {
      resns.splice(index, 1);
    } else {
      resns.push(value);
    }
    setData({ ...data, refusal_reasons: resns });
  };
  const handleSubmit = () => {
    setPopup({
      text: "저장되었습니다.",
      type: "success",
    });
  };
  return (
    <>
      {isOpen && (
        <div className="modal__backdrop">
          <div className="regmodal__content">
            <div className="regmodal__content_header">
              <span className="regmodal__header_heading" onClick={handleClose}>
                승인거부 사유 입력
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
                <div className="refmodal__content_gitemdark">
                  승인거부 사유{" "}
                  <span className="regmodal__content_gdbadge"></span>
                </div>
                <div className="refmodal__content_gitemlight">
                  <div className="refmodal__content_gilinner">
                    {reasons.map((reason) => (
                      <div
                        className="regmodal__content_chkboxwrap"
                        key={reason.value}
                      >
                        <input
                          type="checkbox"
                          name="refusal_reason"
                          onChange={() => handleReasonChecbox(reason.value)}
                          checked={data.refusal_reasons?.includes(reason.value)}
                        />
                        <span className="regmodal__content_chkboxlbl">
                          {reason.label}
                        </span>
                      </div>
                    ))}
                    <textarea
                      className="regmodal__content_otherrsnbox"
                      placeholder="사유 입력"
                      name="refusal_other_reason"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
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

export default RefusalModal;
