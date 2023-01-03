import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip, Button, TextField } from "@mui/material";
import axios from "axios";
import {
  setRekamMedisQuery,
  setRekamMedisResults,
} from "../../redux/rekamMedisSlice";
import { useDispatch, useSelector } from "react-redux";
import PreviewIcon from "@mui/icons-material/Preview";

export default function RekamMedis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rekamMedisQuery, setRekamMedisQuery] = useState("");
  const [rekamMedisResults, setRekamMedisResults] = useState("");

  // const { rekamMedisResults } = useSelector((state) => state.rekamMedis);

  useEffect(() => {
    // try {
    //   getSearchedRekamMedis(rekamMedisQuery);
    // } catch {
    //   console.log("error");
    // }
  }, [rekamMedisResults]);

  const getSearchedRekamMedis = async (query) => {
    const data = await axios
      .get(`http://localhost:3001/patients?q=${query}`)
      .then((res) => {
        console.log(query);
        console.log(res);
        return res.data;
      });
    setRekamMedisResults(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(rekamMedisQuery);
      getSearchedRekamMedis(rekamMedisQuery);
    } catch {
      alert("Error 404");
    }
  };

  const cols = useMemo(
    () => [
      {
        header: "No. Rekam Medis",
        accessorKey: "no_rm",
      },
      {
        header: "Nama Pasien",
        accessorKey: "full_name",
      },
      {
        header: "Transaksi Terakhir",
        accessorKey: "address",
      },
    ],
    []
  );

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
              onChange={(e) => setRekamMedisQuery(e.target.value)}
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
      <Box sx={{ mt: 4 }}>
        <MaterialReactTable
          columns={cols}
          data={rekamMedisResults}
          localization={{
            actions: "",
          }}
          enableEditing
          renderRowActions={({ row, table }) => (
            <Box>
              <Tooltip arrow placement="left" title="Edit">
                <Button
                  sx={{ textTransform: "none" }}
                  size="small"
                  variant="outlined"
                  startIcon={<PreviewIcon />}
                  onClick={() => {
                    console.log(row);
                    navigate("/rekam-medis/selected");
                  }}
                >
                  Preview
                </Button>
              </Tooltip>
            </Box>
          )}
        />
      </Box>
    </>
  );
}
