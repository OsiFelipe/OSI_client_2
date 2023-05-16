import { useState } from "react";
import SimulatorContext from "./SimulatorContext";
import {
  initial_gas_simulator_state,
  initial_gas_simulator_results,
  initial_sand_simulator_results,
  initial_simulator_state,
  initial_sand_simulator_state,
  initial_press_simulator_state,
  initial_press_simulator_results,
  pump_guard_open_area,
  screen_apreture_table,
  gForcePackerlessDimensions,
  max_velocity_ts,
} from "../utils/data";
import { useNavigate } from "react-router-dom";
import {
  GasSimulatorProps,
  GasSimulatorResultProps,
  PressureSimulatorResultProps,
  SandSimulatorProps,
  SandSimulatorResultProps,
  SimulatorProps,
} from "../interfaces/interfaces";
import { useRequest } from "../hooks";
import { PressureSimulatorProps } from "../interfaces/interfaces";
import { max_vel_pg } from "../utils/data";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SimulatorProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const { handleRequest } = useRequest();
  const [gasSimulatorValues, setGasSimulatorValues] =
    useState<GasSimulatorProps>(initial_gas_simulator_state);
  const [gasSimulatorResults, setGasSimulatorResults] =
    useState<GasSimulatorResultProps>(initial_gas_simulator_results);
  const [sandSimulatorValues, setSandSimulatorValues] =
    useState<SandSimulatorProps>(initial_sand_simulator_state);
  const [sandSimulatorResults, setSandSimulatorResults] =
    useState<SandSimulatorResultProps>(initial_sand_simulator_results);
  const [chemSimulatorValues, setChemSimulatorValues] =
    useState<GasSimulatorProps>(initial_gas_simulator_state);
  const [chemSimulatorResults, setChemSimulatorResults] =
    useState<GasSimulatorResultProps>(initial_gas_simulator_results);
  const [pressSimulatorValues, setPressSimulatorValues] =
    useState<PressureSimulatorProps>(initial_press_simulator_state);
  const [pressSimulatorResults, setPressSimulatorResults] =
    useState<PressureSimulatorResultProps>(initial_press_simulator_results);
  const [simulatorState, setSimulatorState] = useState<SimulatorProps>(
    initial_simulator_state
  );

  const handleFetchTechSolution = (id: number | string) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `proposal-solution/${id}`, options })
      .then((response) => {
        if (response.data) {
          const {
            gasSimulator,
            sandSimulator,
            chemSimulator,
            pressSimulator,
            simulator,
          } = response.data;
          if (gasSimulator) {
            setGasSimulatorValues(gasSimulator.data);
            setGasSimulatorResults(gasSimulator.results);
          }
          if (sandSimulator) {
            setSandSimulatorValues(sandSimulator.data);
            setSandSimulatorResults(sandSimulator.results);
          }
          if (pressSimulator) {
            setPressSimulatorValues(chemSimulator.data);
            setPressSimulatorResults(chemSimulator.results);
          }
          if (pressSimulator) {
            setChemSimulatorValues(pressSimulator.data);
            setChemSimulatorResults(pressSimulator.results);
          }
          if (simulator) setSimulatorState(simulator);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateOptSimulator = (
    item: "sand" | "gas" | "pressure",
    value: string
  ) => {
    setSimulatorState((prev) => {
      let newItem = {};
      Object.keys(prev[item]).forEach((key) => {
        newItem = {
          ...newItem,
          [key]: false,
        };
      });
      let newSim = {
        ...prev,
        [item]: { ...newItem, [value]: true },
      };
      return newSim;
    });
  };

  const handleResetSimulation = () => {
    setGasSimulatorResults(initial_gas_simulator_results);
    setGasSimulatorValues(initial_gas_simulator_state);
    setPressSimulatorResults(initial_press_simulator_results);
    setPressSimulatorValues(initial_press_simulator_state);
    setSandSimulatorValues(initial_sand_simulator_state);
    setSandSimulatorResults(initial_sand_simulator_results);
    setSimulatorState((prev) => {
      let newStatus = {};
      Object.entries(prev).forEach((key) => {
        let newItem = {};
        Object.keys(key[1]).forEach((keys) => {
          newItem = {
            ...newItem,
            [keys]: false,
          };
        });
        newStatus = {
          ...newStatus,
          [key[0]]: newItem,
        };
      });
      return { ...prev, ...newStatus };
    });
  };

  const handleCancelSimulation = () => {
    handleResetSimulation();
    navigate(-1);
  };

  const handeUpdateGasSimulatorValues = (item: string, value: any) => {
    let newState = { ...gasSimulatorValues, [item]: value };
    updateGasSimulatorValues(newState);
  };

  const handeUpdateSandSimulatorValues = (item: string, value: any) => {
    let newState = { ...sandSimulatorValues, [item]: value };
    updateSandSimulatorValues(newState);
  };

  const handeUpdatePressSimulatorValues = (item: string, value: any) => {
    let newState = { ...pressSimulatorValues, [item]: value };
    updatePressureSimulatorValues(newState);
  };

  const getGforceValues = (packerlessSize: string) => {
    let values = {};
    Object.entries(gForcePackerlessDimensions).forEach((entry) => {
      if (entry[0] === packerlessSize) {
        values = {
          neckOD: entry[1].neckOD,
          gasSeparatorOD: entry[1].bodyOd,
          gasSeparatorId: entry[1].bodyId,
          ODdiptube: entry[1].dipTubeOd,
        };
        return;
      }
    });
    return values;
  };

  const updateGasSimulatorValues = (newState: GasSimulatorProps) => {
    const {
      packerlessSize,
      plungerSize,
      strokeLength,
      pumpSpeed,
      bfpd,
      wCut,
      gasRate,
      oilApi,
    } = newState;
    const bwpd = (bfpd * wCut) / 100;
    const bopd = bfpd - bwpd;
    const glr = +((gasRate * 1000) / bfpd).toFixed(2);
    const wor = +(bwpd / bopd).toFixed(2);
    const gor = +((gasRate / bopd) * 1000).toFixed(2);
    const oilSp = +(141.5 / (oilApi + 131.5)).toFixed(2);
    const pumpCapacity = +(
      (Math.pow(plungerSize, 2) * strokeLength * pumpSpeed * 1440 * Math.PI) /
      (4 * 9702)
    ).toFixed(2);
    let pCapacity = +(
      (Math.PI / 4) *
      Math.pow(plungerSize, 2) *
      strokeLength *
      (42 / (5.615 * Math.pow(12, 3)))
    );
    const pumpCapacityByStroke = !simulatorState.gas.poorBoy
      ? +pCapacity.toFixed(3)
      : +(pCapacity * 0.85).toFixed(3);
    if (simulatorState.gas.gforce) {
      const valuesGForce = getGforceValues(packerlessSize);
      setGasSimulatorValues((prev) => {
        return {
          ...prev,
          ...newState,
          bwpd: +bwpd.toFixed(3),
          bopd: +bopd.toFixed(3),
          glr: +glr.toFixed(3),
          wor: +wor.toFixed(3),
          gor: +gor.toFixed(3),
          oilSp,
          pumpCapacity,
          pumpCapacityByStroke,
          ...valuesGForce,
        };
      });
    } else {
      setGasSimulatorValues((prev) => {
        return {
          ...prev,
          ...newState,
          bwpd: +bwpd.toFixed(3),
          bopd: +bopd.toFixed(3),
          glr: +glr.toFixed(3),
          wor: +wor.toFixed(3),
          gor: +gor.toFixed(3),
          oilSp,
          pumpCapacity,
          pumpCapacityByStroke,
        };
      });
    }
  };

  const simulateGas = () => {
    const {
      casingId,
      wor,
      bopd,
      pumpSpeed,
      bfpd,
      gor,
      pumpCapacityByStroke,
      temperature,
      oilApi,
      gasSP,
      pip,
      waterSP,
      gasSeparatorOD,
      gasSeparatorId,
      ODdiptube,
      numberGasBodies,
      neckOD,
      gasSeparatorLength,
      interfacialTension,
      gravitationalForce,
    } = gasSimulatorValues;
    let correlationTempAndOilApi = 0.00091 * +temperature - 0.0125 * +oilApi;
    let pseudoCriticalTemperature = 170.5 + 307.3 * +gasSP;
    let pseudoCriticalPressure = 709.6 - 58.7 * +gasSP;
    let pseudoReducedTemperature =
      (+temperature + 460) / pseudoCriticalTemperature;
    let pseudoReducedPressure = (+pip + 14.7) / pseudoCriticalPressure;
    let deviationFactor =
      1 -
      (3.52 * pseudoReducedPressure) /
        Math.pow(10, 0.9813 * pseudoReducedTemperature) +
      (0.274 * Math.pow(pseudoReducedPressure, 2)) /
        Math.pow(10, 0.8157 * pseudoReducedTemperature);
    let solutionGas =
      +gasSP *
      Math.pow(+pip / 18 / Math.pow(10, correlationTempAndOilApi), 1.2048);
    const oilSP = 141.5 / (+oilApi + 131.5);
    let correlationSolutionGas =
      solutionGas * Math.sqrt(+gasSP / oilSP) + 1.25 * +temperature;
    let oilVolumeFactor =
      0.971 + 1.47 * Math.pow(10, -4) * Math.pow(correlationSolutionGas, 1.175);
    let waterVolumeFactor =
      1 +
      1.21 * Math.pow(10, -4) * (+temperature - 60) +
      Math.pow(10, -6) * Math.pow(+temperature - 60, 2) -
      3.33 * Math.pow(10, -6) * +pip;
    let gasVolumeFactor = simulatorState.gas.gforce
      ? (0.0283 * +oilSP * (+temperature + 460)) / (+pip + 14.7)
      : (0.0283 * deviationFactor * (+temperature + 460)) / (+pip + 14.7);
    let gasDensity = (0.0764 * +gasSP) / gasVolumeFactor;
    let liquidDensity =
      62.4 *
      (((oilSP / oilVolumeFactor) * 1) / (1 + +wor) +
        ((+waterSP / waterVolumeFactor) * +wor) / (1 + +wor));
    let freeGasEnteringPump = +(
      +bopd *
      (+gor - solutionGas) *
      gasVolumeFactor
    ).toFixed(3);
    let gasBubbleTerminalVelocity = +(
      Math.pow(2, 0.5) *
      Math.pow(
        (+interfacialTension *
          (liquidDensity - gasDensity) *
          +gravitationalForce) /
          Math.pow(liquidDensity, 2),
        0.25
      )
    ).toFixed(3);
    let crossSectionalArea = simulatorState.gas.packerType
      ? +(
          0.0055 *
          (Math.pow(casingId, 2) - Math.pow(gasSeparatorOD, 2))
        ).toFixed(3)
      : simulatorState.gas.poorBoy
      ? +(
          0.0055 *
          (Math.pow(gasSeparatorId, 2) - Math.pow(ODdiptube, 2))
        ).toFixed(3)
      : +(0.0055 * (Math.pow(+casingId, 2) - Math.pow(neckOD, 2))).toFixed(3);
    let inSituSuperficialLiquidVelocity =
      6.5 *
      Math.pow(10, -5) *
      (+bfpd / crossSectionalArea) *
      (oilVolumeFactor / (1 + wor) + (waterVolumeFactor * +wor) / (1 + +wor));
    let naturalSeparationEfficiency = +(
      (gasBubbleTerminalVelocity /
        (gasBubbleTerminalVelocity + inSituSuperficialLiquidVelocity)) *
      100
    ).toFixed(3);
    let freeGasEnteringPumbWithSeparator = +(
      freeGasEnteringPump *
      (1 - naturalSeparationEfficiency / 100)
    ).toFixed(3);
    let quiteZoneVolume = simulatorState.gas.gforce
      ? (0.0055 *
          (Math.pow(+gasSeparatorId, 2) - Math.pow(+ODdiptube, 2)) *
          20 +
          0.0055 * (Math.pow(2.441, 2) - Math.pow(1.3, 2)) * 4 +
          0.0055 *
            (Math.pow(3.5, 2) - Math.pow(1.3, 2)) *
            +numberGasBodies *
            20) *
        7.48052
      : 0.0055 *
        (Math.pow(casingId, 2) - Math.pow(gasSeparatorOD, 2)) *
        gasSeparatorLength *
        7.48052;
    let effectiveStrokes = quiteZoneVolume / pumpCapacityByStroke;
    let retentionTime = effectiveStrokes / pumpSpeed;
    setGasSimulatorResults((prev) => {
      return {
        ...prev,
        freeGasEnteringPump: +freeGasEnteringPump.toFixed(4),
        gasBubbleTerminalVelocity: +gasBubbleTerminalVelocity.toFixed(4),
        crossSectionalArea: +crossSectionalArea.toFixed(4),
        inSituSuperficialLiquidVelocity:
          +inSituSuperficialLiquidVelocity.toFixed(4),
        naturalSeparationEfficiency: +naturalSeparationEfficiency.toFixed(4),
        freeGasEnteringPumbWithSeparator:
          +freeGasEnteringPumbWithSeparator.toFixed(4),
        quiteZoneVolume: +quiteZoneVolume.toFixed(4),
        effectiveStrokes: +effectiveStrokes.toFixed(4),
        retentionTime: +retentionTime.toFixed(4),
      };
    });
  };

  const getOpenAreaSuperPerf = (selectedSuperPerf: string) => {
    if (selectedSuperPerf === '2-3/8"') return 131.08;
    if (selectedSuperPerf === '2-7/8"') return 153.9;
    return 179.95;
  };

  const getOpenAreaTubingScreen = (slot: number) => {
    return +((slot / (slot + 0.09)) * Math.PI * 3.37 * 12 * 20).toFixed(2);
  };
  const getOpenAreaPumpGuard = (selectedPumpGuard: string, slot: number) => {
    let newOpenArea = 0;
    Object.entries(pump_guard_open_area).forEach((entry) => {
      if (entry[0] === selectedPumpGuard) {
        Object.entries(entry[1]).forEach((ent) => {
          if (parseFloat(ent[0]) === slot) newOpenArea = ent[1];
        });
      }
    });
    return newOpenArea;
  };

  const updateSandSimulatorValues = (newState: SandSimulatorProps) => {
    let { slot, slotPg, selectedSuperPerf, selectedPumbGuard } = newState;
    const openAreaOfScreen = simulatorState.sand.tubingScreen
      ? getOpenAreaTubingScreen(parseFloat(slot))
      : simulatorState.sand.superPerf
      ? getOpenAreaSuperPerf(selectedSuperPerf)
      : getOpenAreaPumpGuard(selectedPumbGuard, parseFloat(slotPg));
    setSandSimulatorValues((prev) => {
      return {
        ...prev,
        ...newState,
        openAreaOfScreen,
      };
    });
  };

  const simulateSand = () => {
    const {
      bfpd,
      slot,
      slotSp,
      slotPg,
      wellClasification,
      openAreaOfScreen,
      numberOfTubingScreen,
      percentageRuntime,
      numberOfPumpGuard,
    } = sandSimulatorValues;
    const totalOpenAreaOfScreen = simulatorState.sand.pumpGuard
      ? openAreaOfScreen * numberOfPumpGuard
      : openAreaOfScreen * numberOfTubingScreen;
    const minutePerDay = (percentageRuntime / 100) * 1440;
    const productionPerMinuteOfRun = +(bfpd / minutePerDay);
    const productionCubicInches = productionPerMinuteOfRun * 9702;
    const productionInchByOpening = +(
      productionCubicInches /
      totalOpenAreaOfScreen /
      60
    ).toFixed(6);
    let slotValue = simulatorState.sand.tubingScreen
      ? slot
      : simulatorState.sand.pumpGuard
      ? slotPg
      : slotSp;
    const maxByTs = getMaxByTs(slotValue, wellClasification) || 0;
    setSandSimulatorResults((prev) => {
      return {
        ...prev,
        totalOpenAreaOfScreen: +totalOpenAreaOfScreen.toFixed(2),
        minutePerDay: +minutePerDay.toFixed(2),
        productionPerMinuteOfRun: +productionPerMinuteOfRun.toFixed(5),
        productionCubicInches: +productionCubicInches.toFixed(2),
        productionInchByOpening: simulatorState.sand.tubingScreen
          ? productionInchByOpening * 0.75
          : productionInchByOpening * 2,
        maxByTs,
      };
    });
  };

  const getMaxByTs = (slot: string, wellClasification: string) => {
    let wellCl: "SEVERE" | "BAD" | "AVERAGE" =
      wellClasification === "SEVERE"
        ? "SEVERE"
        : wellClasification === "BAD"
        ? "BAD"
        : "AVERAGE";
    if (simulatorState.sand.tubingScreen || simulatorState.sand.pumpGuard) {
      const result = max_velocity_ts.filter((item) => item.slot === slot);
      if (result.length > 0) {
        return +(
          result[0].oldVelocity /
          result[0].factor /
          result[0][`${wellCl}`]
        ).toFixed(5);
      }
    } else {
      return +(
        max_vel_pg.oldVelocity /
        max_vel_pg.factor /
        max_vel_pg[`${wellCl}`]
      ).toFixed(5);
    }
  };

  const updatePressureSimulatorValues = (newState: PressureSimulatorProps) => {
    let {
      pip,
      deltaP,
      sp,
      api,
      temperature,
      bfpd,
      wCut,
      numberOfTubingScreen,
      gasRate,
      diameter,
    } = newState;
    const bopd = bfpd - (bfpd * wCut) / 100;
    const bwpd = (bfpd * wCut) / 100;
    const gor = +((gasRate / bopd) * 1000).toFixed(2);
    if (simulatorState.pressure.dipTube) {
      const avgPressure = pip + deltaP / 2;
      const spo = 141.5 / (131.5 + api);
      const rs =
        sp *
        Math.pow(
          (avgPressure / 18.2 + 1.4) *
            Math.pow(10, 0.0125 * api - 0.00091 * temperature),
          1.2048
        );
      const bo =
        0.9759 +
        0.00012 *
          Math.pow(rs * Math.pow(sp / spo, 0.5) + 1.25 * temperature, 1.2);
      const prd = avgPressure / (667 + 15 * sp - 37.5 * Math.pow(sp, 2));
      const trd =
        (temperature + 460) / (168 + 325 * sp - 12.5 * Math.pow(sp, 2));
      const z = getZFactor(prd, trd);
      const ap = +((Math.PI / 4) * Math.pow(diameter / 12, 2)).toFixed(3);
      setPressSimulatorValues((prev) => {
        return {
          ...prev,
          ...newState,
          spo: +spo.toFixed(2),
          avgPressure: +avgPressure.toFixed(3),
          rs: +rs.toFixed(3),
          bo: +bo.toFixed(3),
          prd: +prd.toFixed(3),
          trd: +trd.toFixed(3),
          z: +z.toFixed(3),
          bopd: +bopd.toFixed(3),
          bwpd: +bwpd.toFixed(3),
          gor,
          ap,
        };
      });
    } else {
      const openArea = 253.9 * numberOfTubingScreen;
      const waterRate = (bfpd * wCut) / 100;
      setPressSimulatorValues((prev) => {
        return {
          ...prev,
          ...newState,
          openArea,
          waterRate,
          bopd: +bopd.toFixed(3),
          bwpd: +bwpd.toFixed(3),
          gor,
        };
      });
    }
  };

  const getZFactor = (prd: number, trd: number): number => {
    // if (prd > 0.12)
    return 1;
  };

  const getDeltaPDipTube = (
    DipTubId: number,
    dipTubeLength: number,
    velocity: number,
    reynolds: number,
    f: number,
    temp: number
  ) => {
    let result = 0;
    if (reynolds < 2300) {
      result = 64 / reynolds;
    } else {
      result =
        ((f * (dipTubeLength * 12)) / DipTubId) *
        ((temp * Math.pow(velocity / 60, 2)) / 5);
    }
    return +result.toFixed(5);
  };

  const getScreenAperture = (slotSize: string) => {
    let result = 0;
    Object.entries(screen_apreture_table).forEach((entry) => {
      if (entry[0] === slotSize) result = entry[1];
    });
    return result;
  };

  const simulatePressure = () => {
    const {
      bfpd,
      wCut,
      DipTubId,
      sp,
      viscocity,
      dipTubeLength,
      slotSize,
      openArea,
      screenLength,
      numberOfTubingScreen,
      diameter,
      api,
      spw,
      spo,
      bo,
      bopd,
      bwpd,
      z,
      gor,
      rs,
      ap,
      temperature,
    } = pressSimulatorValues;
    const waterRate = (bfpd * wCut) / 100;
    if (simulatorState.pressure.dipTube) {
      const correctedQo = 6.49 * Math.pow(10, -5) * bopd * bo;
      const correctedQw = 6.49 * Math.pow(10, -5) * bwpd;
      const correctedQl = correctedQo + correctedQw;
      const correctedQg =
        3.27 *
        Math.pow(10, -7) *
        z *
        bopd *
        (gor - rs) *
        ((temperature + 460) / 9);
      const correctedQt = correctedQl + correctedQg;
      const correctedflowRateO =
        bopd *
        (4.05 * Math.pow(10, -3) * spo + 8.85 * Math.pow(10, -7) * sp * rs);
      const correctedflowRateW = spw * 62.43 * bwpd * (5.615 / 86400);
      const correctedflowRateG =
        8.85 * Math.pow(10, -7) * bopd * sp * (gor - rs);
      const correctedFlowRateT =
        correctedflowRateO + correctedflowRateW + correctedflowRateG;
      const liquidDensity =
        (correctedflowRateO + correctedflowRateW) / correctedQl;
      const gasDensity = correctedflowRateG / correctedQg;
      const vT = correctedQt / ap;
      const flowRegimeQgQt = correctedQg / correctedQt;
      const flowRegimeVgD =
        (correctedQg * Math.pow(0.534 * liquidDensity, 1 / 4)) / ap;
      const tempCondition =
        1.071 - (0.2218 * Math.pow(vT, 2)) / (diameter / 12);
      const flowRegimeLB = tempCondition < 0.13 ? 0.13 : tempCondition;
      const flowRegimeLS =
        50 + 36 * flowRegimeVgD * (correctedQl / correctedQg);
      const flowRegimeLM =
        75 + 84 * Math.pow(flowRegimeVgD * (correctedQl / correctedQg), 0.75);
      const flowRegimeVg = correctedQg / ap;
      // Voy aqui
      const flowRegimeFg =
        0.5 *
        (1 +
          correctedQt / (0.8 * ap) -
          Math.sqrt(1 + correctedQt / (0.8 * ap)));
      const relativeRoughness = 0.0018 / DipTubId;
      const velocity =
        (bfpd * 0.00292426215) / ((Math.PI * Math.pow(DipTubId / 12, 2)) / 4);
      const temp = (8.328 * sp) / 231;
      const reynolds =
        (temp * velocity * DipTubId) /
        (viscocity * 1.45037737796858 * Math.pow(10, -7) * 12);
      const f = 0.027;
      const deltaP = getDeltaPDipTube(
        DipTubId,
        dipTubeLength,
        velocity,
        reynolds,
        f,
        temp
      );
      setPressSimulatorResults((prev) => {
        return {
          ...prev,
          waterRate: +waterRate.toFixed(2),
          relativeRoughness: +relativeRoughness.toFixed(5),
          velocity: +velocity.toFixed(2),
          reynolds: +reynolds.toFixed(2),
          f,
          deltaP,
        };
      });
    } else {
      const screenAperture = getScreenAperture(slotSize);
      const freeArea =
        (openArea * numberOfTubingScreen) /
        (Math.PI * diameter * screenLength * 12);
      const bopd = bfpd * (1 - wCut / 100);
      const fluidDensity =
        (((141.5 / (api + 131.5)) * bopd + (bfpd - bopd) * spw) / bfpd) * 62.4;
      const fluidVelocity =
        (bfpd * 5.615) / (86400 * (numberOfTubingScreen * (openArea / 144)));
      const reynolds =
        (screenAperture * fluidVelocity * fluidDensity) /
        (freeArea * viscocity * 0.000672);
      const dischargeCoefficient =
        reynolds < 20
          ? +(0.1 * Math.sqrt(reynolds)).toFixed(5)
          : "Turbulent Flow";
      const lossPressCoeff =
        dischargeCoefficient !== "Turbulent Flow"
          ? +(
              (1 / Math.pow(dischargeCoefficient, 2)) *
              ((1 - Math.pow(freeArea, 2)) / Math.pow(freeArea, 2))
            ).toFixed(5)
          : 0;
      const lossPressure =
        (lossPressCoeff * fluidDensity * Math.pow(fluidVelocity, 2)) / 2;
      setPressSimulatorResults((prev) => {
        return {
          ...prev,
          screenAperture,
          freeArea: +freeArea.toFixed(2),
          fluidDensity: +fluidDensity.toFixed(2),
          fluidVelocity: +fluidVelocity.toFixed(5),
          reynolds: +reynolds.toFixed(5),
          dischargeCoefficient,
          lossPressCoeff: +lossPressCoeff.toFixed(3),
          lossPressure: +lossPressure.toFixed(5),
        };
      });
    }
  };

  return (
    <SimulatorContext.Provider
      value={{
        simulatorState,
        gasSimulatorValues,
        gasSimulatorResults,
        sandSimulatorValues,
        sandSimulatorResults,
        pressSimulatorValues,
        pressSimulatorResults,
        handleCancelSimulation,
        handleResetSimulation,
        onUpdateOptSimulator: handleUpdateOptSimulator,
        onUpdateGasSimulatorValues: handeUpdateGasSimulatorValues,
        onUpdateSandSimulatorValues: handeUpdateSandSimulatorValues,
        onUpdatePressSimulatorValues: handeUpdatePressSimulatorValues,
        fetchTechSolution: handleFetchTechSolution,
        onSimulateGas: simulateGas,
        onSimulateSand: simulateSand,
        onSimulatePressure: simulatePressure,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export default SimulatorProvider;
