import React, { useEffect, useState } from "react";
import "./Home.css";
import Table from "../../Components/Table/Table";
import { data } from "../../data/data";
import Navbar from "../../Components/Navbar/Navbar";
import CustomDropdown from "../../Components/CustomDropdown/CustomDropdown";
import Popup from "../../Components/Modals/Popup";
import RegisterModal from "../../Components/Modals/RegisterModal";
import RefusalModal from "../../Components/Modals/RefusalModal";

const statusOptions = [
  { value: "승인여부 전체", label: "승인여부 전체 " },
  { value: "승인대기", label: "승인대기" },
  { value: "승인완료", label: "승인완료" },
  { value: "승인거부", label: "승인거부" },
];

const orderOptions = [
  { value: "신청일시순", label: "신청일시순 " },
  { value: "승인일시순", label: "승인일시순" },
];

const changeApprovalOptions = [
  { value: "승인상태 변경", label: "승인상태 변경 ", disabled: true },
  { value: "승인완료", label: "승인완료" },
  { value: "승인거부", label: "승인거부" },
];
const viewOptions = [
  { value: 10, label: "10개씩 보기 " },
  { value: 20, label: "20개씩 보기 " },
  { value: 30, label: "30개씩 보기 " },
];

const filterData = (data, filters) => {
  let filteredData = [...data];

  if (filters.includes("신청일시순")) {
    filteredData.sort(
      (a, b) => new Date(a.application_date) - new Date(b.application_date)
    );
  }

  if (filters.includes("승인일시순")) {
    filteredData.sort(
      (a, b) => new Date(a.approval_date) - new Date(b.approval_date)
    );
  }

  if (filters.includes("승인여부 전체")) {
    return filteredData;
  }

  if (filters.includes("승인대기")) {
    filteredData = filteredData.filter((item) => item.approval === "승인대기");
  }

  if (filters.includes("승인완료")) {
    filteredData = filteredData.filter((item) => item.approval === "승인완료");
  }

  if (filters.includes("승인거부")) {
    filteredData = filteredData.filter((item) => item.approval === "승인거부");
  }

  return filteredData;
};
const countWaitingForApproval = (data) => {
  return data.filter((item) => item.approval === "승인대기").length;
};
const Home = () => {
  const [popup, setPopup] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [modal, setModal] = useState();
  const [filterOptions, setFilterOptions] = useState({
    status: { value: "승인여부 전체", label: "승인여부 전체" },
    order: { value: "신청일시순", label: "신청일시순" },
  });
  const [filteredData, setFilteredData] = useState([]);
  const [viewOption, setViewOption] = useState(viewOptions[0]);
  const [approvalOption, setApprovalOption] = useState(
    changeApprovalOptions[0]
  );

  const handleCheckedRows = (id) => {
    setCheckedRows((prevRows) => {
      if (prevRows.includes(id)) {
        return prevRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevRows, id];
      }
    });
  };
  const handleAllCheckedRows = () => {
    if (filteredData?.length && checkedRows?.length === filteredData?.length) {
      setCheckedRows([]);
    } else {
      const ids = filteredData.map((item) => item.id);
      setCheckedRows(ids);
    }
  };
  function getStatusStyles(status) {
    switch (status) {
      case "승인대기":
        return { color: "#9A3412", background: "#FFEDD5" };
      case "승인거부":
        return { color: "#991B1B", background: "#FEE2E2" };
      case "승인완료":
        return { color: "#166534", background: "#DCFCE7" };
      default:
        return { color: "black", background: "white" };
    }
  }
  const columns = [
    {
      title: (
        <input
          type="checkbox"
          className="table__checkbox"
          checked={
            checkedRows?.length === filteredData?.length && filteredData.length
          }
          onChange={handleAllCheckedRows}
        />
      ),
      dataKey: "age",
      render: (item) => (
        <input
          type="checkbox"
          className="table__checkbox"
          checked={checkedRows.includes(item.id)}
          onChange={() => handleCheckedRows(item.id)}
        />
      ),
      width: "40px",
    },
    {
      title: "NO",
      dataKey: "id",
      render: (item, index) => index + 1,
      width: "53px",
    },
    {
      title: "기존유형",
      dataKey: "existing_type",
      width: "100px",
    },
    {
      title: "신청유형",
      dataKey: "application_type",
      width: "100px",
    },
    {
      title: "제출서류",
      dataKey: "document_to_submit",
      render: (item) => <button className="document__view_btn">보기</button>,
      width: "100px",
    },
    {
      title: "신청일시",
      dataKey: "application_date",
      width: "190px",
    },
    {
      title: "승인여부",
      dataKey: "approval",
      render: (item) => (
        <div
          style={{
            color: getStatusStyles(item.approval).color,
            background: getStatusStyles(item.approval).background,
          }}
          className="approval__badge"
        >
          {item.approval}
        </div>
      ),
      width: "87px",
    },
    {
      title: "승인거부 사유",
      dataKey: "disapprove_reason",
      width: "372px",
    },
    {
      title: "승인일시",
      dataKey: "approval_date",
      width: "190px",
    },
  ];

  const updateApprovalStatus = (ids, value) => {
    if (value === "승인상태 변경") {
      return;
    }

    const isApproved = filteredData.some(
      (item) => ids.includes(item.id) && item.approval === "승인완료"
    );
    if (isApproved) {
      setPopup({
        text: "이미 승인 완료된 회원입니다.",
        type: "warning",
        action: false,
      });
      return;
    }
    const isDenied = filteredData.some(
      (item) => ids.includes(item.id) && item.approval === "승인거부"
    );
    if (isDenied) {
      setPopup({
        text: "이미 승인 거부된 회원입니다.",
        type: "warning",
        action: false,
      });
      return;
    }
    const updatedData = filteredData.map((item) => {
      if (ids.includes(item.id)) {
        if (value === "승인완료") {
          return { ...item, approval: "승인완료" };
        } else if (value === "승인거부") {
          return { ...item, approval: "승인거부" };
        }
      }
      return item;
    });
    setFilteredData(updatedData);
    setApprovalOption(opt);
    setPopup({
      text: "저장되었습니다.",
      type: "success",
      action: false,
    });
  };

  useEffect(() => {
    let fdata = filterData(
      data,
      Object.values(filterOptions).map((item) => item.value)
    );
    setFilteredData(fdata);
  }, [filterOptions]);
  useEffect(() => {
    setApprovalOption(changeApprovalOptions[0]);
  }, [checkedRows]);
  return (
    <div>
      <div className="home__topbar">
        <div className="home__topbar_heading">회원상세</div>
        <div className="home__topbar_badge">
          <span className="home__topbar_badgeicon"></span>필수항목
        </div>
      </div>
      <Navbar />
      <Popup
        isOpen={popup?.text}
        text={popup?.text}
        type={popup?.type}
        handleClose={() => setPopup(false)}
        action={popup?.action}
        choice={popup?.choice}
      />
      <RegisterModal
        isOpen={modal === "registration"}
        handleClose={() => setModal(false)}
        setPopup={setPopup}
      />
      <RefusalModal
        isOpen={modal === "refusal"}
        handleClose={() => setModal(false)}
        setPopup={setPopup}
      />
      <div className="home__screen_content">
        <div className="home__scrncontent_tablewrap">
          <div className="home__scrntable_options">
            <div className="home__scrntable_optstop">
              <div className="home__scrntable_opleft">
                <div className="home__scrntable_opltitle">신청 목록</div>
                <div className="home__scrntable_oplsubtitle">
                  (총 {filteredData ? filteredData.length : 0}명 | 승인대기{" "}
                  <span>{countWaitingForApproval(filteredData)}</span>건)
                </div>
              </div>
              <div className="home__scrntable_opleft">
                <span>
                  <CustomDropdown
                    options={statusOptions}
                    selectedOption={filterOptions.status}
                    setSelectedOption={(opt) => {
                      setFilterOptions({ ...filterOptions, status: opt });
                    }}
                  />
                </span>
                <span>
                  <CustomDropdown
                    options={orderOptions}
                    selectedOption={filterOptions.order}
                    setSelectedOption={(opt) => {
                      setFilterOptions({ ...filterOptions, order: opt });
                    }}
                  />
                </span>
                <span>
                  <CustomDropdown
                    options={viewOptions}
                    selectedOption={viewOption}
                    setSelectedOption={(opt) => {
                      setViewOption(opt);
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="home__scrntable_optsbottom">
              <div className="home__scrntable_opleft">
                <button
                  className="home__scrntable_btn"
                  onClick={() => setModal("registration")}
                >
                  등록
                </button>
              </div>
              <div className="home__scrntable_opright">
                <span>선택한 {checkedRows?.length ?? 0}건</span>
                <span className="home__scrntable_selected">
                  <CustomDropdown
                    options={changeApprovalOptions}
                    selectedOption={approvalOption}
                    setSelectedOption={(opt) => {
                      if (checkedRows.length > 0) {
                        if (opt?.value === "승인거부") {
                          setModal("refusal");
                          return;
                        }
                        setPopup({
                          text: `선택된 ${checkedRows?.length}건의 승인상태를 변경하시겠습니까?`,
                          type: "warning",
                          action: () => {
                            updateApprovalStatus(checkedRows, opt?.value);
                          },
                          choice: true,
                        });
                      } else {
                        setApprovalOption(changeApprovalOptions[0]);
                        setPopup({
                          text: "선택된 신청건이 없습니다.",
                          type: "warning",
                          action: false,
                        });
                      }
                    }}
                  />
                </span>
                <button className="home__scrntable_btn">저장</button>
              </div>
            </div>
          </div>
          <Table
            data={filteredData}
            columns={columns}
            striped={true}
            itemsPerPage={viewOption.value}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
