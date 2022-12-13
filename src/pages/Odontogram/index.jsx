import React, { useState } from "react";
import OdontogramElement from "../../components/OdontogramElement";
import ToothPalette from "../../components/OdontogramElement/ToothPalette";
import Container from "../../layouts/Container";
import { Input } from "antd";
import { ButtonBack } from "../../components/Button";

export default function Odontogram() {
  const [fillColor, setFillColor] = useState(Array(9).fill("white"));
  const [currentColor, setCurrentColor] = useState("white");

  const onFillColor = (i) => {
    console.log(i)

    let newFillColors = fillColor.slice(0);
    newFillColors[i] = currentColor;
    setFillColor(newFillColors);
    console.log("clicked");
  };

  const { TextArea } = Input;

  return (
    <div>
      <ButtonBack/>
      <h1>Odontogram</h1>
      <p className="mt-2">Last edited by drg. I Nyoman Putra Mahendra Suyoga</p>

      <div className="flex flex-row">
        <Container>
          <OdontogramElement
            width={900}
            height={300}
            fillColor={fillColor}
            onFill={onFillColor}
          />
        </Container>
        <Container text="Keadaan Gigi" className="ml-5">
          <ToothPalette selectedColor={setCurrentColor} />
          <p className="font-bold">Diagnosa :</p>
          <p className="font-bold">Tindakan :</p>
          <p className="font-bold">Dokter :</p>
        </Container>
      </div>

      <Container className="mt-3 mb-1" text="Pertemuan pertama">
        <div className="flex flex-row justify-around">
          <div>
            <p className="font-semibold">Diagnosa kerja:</p>
            <TextArea
              maxLength={100}
              style={{ height: 120 }}
              value={`Gingivectomy 47, Pro-exo 38`}
            />
          </div>

          <div>
            <p className="font-semibold">Tindakan:</p>
            <TextArea
              maxLength={100}
              style={{ height: 12 }}
              value={`-`}
            />
          </div>

          <div>
            <p className="font-semibold">Rencana perawatan:</p>
            <TextArea
              style={{ height: 120, width: 300}}
              value={`Gingivectomy 47, Pro-exo 38`}
            />
          </div>

          <div className="mt-5">
            <p>Denpasar, 21 September 2022</p>
            <p>Dokter yang menangani,</p>
            <p className="font-bold text-base">
              drg. I Nyoman Putra Mahendra Suyoga
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
