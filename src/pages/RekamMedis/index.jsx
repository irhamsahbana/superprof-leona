import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../assets/search.svg";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {
  setRekamMedisQuery,
  setRekamMedisResults,
} from "../../redux/rekamMedisSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RekamMedis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rekamMedisQuery, rekamMedisResults } = useSelector(
    (state) => state.rekamMedis
  );

  const getSearchedRekamMedis = async (query) => {
    const data = await axios
      .get(`http://localhost:3001/patients?q=${query}`)
      .then((res) => {
        console.log(query);
        console.log(res);
        return res.data;
      });
    dispatch(setRekamMedisResults(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(rekamMedisResults);
      console.log(rekamMedisQuery);
      getSearchedRekamMedis(rekamMedisQuery);
      navigate("/rekam-medis/search");
    } catch {
      alert("Error 404");
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1>Rekam Medis</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-8/12 flex flex-row">
          <span className="h-10">
            <TextField
              size="small"
              sx={{ padding: 0, margin: 0 }}
              label="Nama/ No. RM pasien"
              variant="outlined"
              onChange={(e) => dispatch(setRekamMedisQuery(e.target.value))}
            />
          </span>
          <div className="w-4"></div>
          <span>
            <Button
              sx={{ textTransform: "none" }}
              type="submit"
              size="medium"
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </span>
        </div>
      </form>
      <div className="pl-50 ml-[500px] mt-40">
        <img className="w-48 h-auto" alt="Search" src={Search} />
        <p className="pt-7 text-lg">Belum ada rekam medis yang dicari</p>
      </div>
    </>
  );
}
