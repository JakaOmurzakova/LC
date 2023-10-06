import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Input, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RoomPage = () => {
  const [value, setValue] = useState(dayjs(""));
  const [value1, setValue1] = useState(dayjs(""));
  const valueCount = 0;
  const [searchParam] = useSearchParams();
  const { activateUser } = useAuthContext();

  console.log(searchParam.get("u"));
  console.log(dayjs(value));

  useEffect(() => {
    activateUser(searchParam.get("u"));
  }, []);

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2>Остаток счета: </h2>
        <input
          value={valueCount}
          style={{
            width: "200px",
            height: "35px",
            border: "2px solid green",
            borderRadius: "8px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
          gap: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <p>Дата с</p>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ overflow: "hidden" }}
            >
              <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <p>Дата по</p>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ overflow: "hidden" }}
            >
              <DatePicker
                value={value1}
                onChange={(newValue1) => setValue1(newValue1)}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        ></div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Загрузка
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default RoomPage;
