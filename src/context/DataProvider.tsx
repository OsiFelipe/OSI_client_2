import { useEffect, useState } from "react";
import { useRequest } from "../hooks";
import {
  basic_initial_state,
  initial_sales_state,
  initial_solution_state,
  new_tally_row,
  new_wbd_item,
  initial_simulator_state,
  new_wbd_custom_item,
  new_tally_custom_row,
} from "../utils/data";
import DataContext from "./DataContext";
import {
  ProductProps,
  WbdItemProps,
  WellProps,
  SimulatorProps,
} from "../interfaces/interfaces";
import exportFromJSON, { ExportType } from "export-from-json";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const DataProvider = ({ children }: Props) => {
  const { handleRequest } = useRequest();
  const navigate = useNavigate();
  const [basicInfo, setBasicinfo] = useState(basic_initial_state);
  const [salesInfo, setSalesInfo] = useState(initial_sales_state);
  const [clientOptions, setClientOptions] = useState([{ id: 0, name: "" }]);
  const [productOptions, setProductOptions] = useState<[] | ProductProps[]>([]);
  const [wellOptions, setWellOptions] = useState([]);
  const [mudWeight, setMudWeight] = useState(0);
  const [totalLenght, setTotalLength] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [lastBottom, setLastBottom] = useState(0);
  const [solution, setSolution] = useState(initial_solution_state);
  const [simulator, setSimulator] = useState<SimulatorProps>(
    initial_simulator_state
  );
  const [tallyDesign, setTallyDesign] = useState<[] | ProductProps[]>([]);
  const [wbdDesign, setWbdDesign] = useState<[] | WbdItemProps[]>([]);
  const [wellbore3dImg, setWellbore3dImg] = useState<string>("");
  const [designByPage, setDesignByPage] = useState<WbdItemProps[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toSave, setToSave] = useState(false);
  const [orderIsReady, setOrderIsReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    handleFetchDataClient();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 3000);
  }, [isSuccess]);

  useEffect(() => {
    if (
      salesInfo.client !== "" &&
      salesInfo.wellName !== "" &&
      salesInfo.needBy !== ""
    )
      setOrderIsReady(true);
    return () => {
      setOrderIsReady(false);
    };
  }, [salesInfo]);

  useEffect(() => {
    if (
      basicInfo.client.id !== 0 &&
      basicInfo.well.id !== 0 &&
      basicInfo.customName !== ""
    )
      setToSave(true);
    return () => {
      setToSave(false);
    };
  }, [basicInfo]);

  const handleUpdateBasicInfo = (item: string, newValue: any) => {
    item === "mdDepth" &&
      setTallyDesign(updateTallyInfo(tallyDesign, newValue));
    setBasicinfo((prev) => {
      return { ...prev, [item]: newValue };
    });
    item === "prodImage" && setIsSuccess(true);
  };

  const handleUpdateSalesInfo = (item: string, newValue: any) => {
    if (item === "clientInfo") {
      setSalesInfo((prev) => {
        return { ...prev, ...newValue };
      });
    } else {
      setSalesInfo((prev) => {
        return { ...prev, [item]: newValue };
      });
    }
  };

  const handleUpdateSalesProductList = (
    index: number,
    property: string,
    newValue: any
  ) => {
    setSalesInfo((prev) => {
      let newProducList = prev.productList.map((item, i) => {
        if (index === i) {
          return { ...item, [property]: newValue };
        }
        return item;
      });
      return { ...prev, productList: newProducList };
    });
  };

  const hanleAddProductToSales = (newItem: any) => {
    setSalesInfo((prev) => {
      return {
        ...prev,
        productList: [...prev.productList, { ...newItem, osi: true }],
      };
    });
  };

  const handleUpdateBhaDesign = (item: string, newValue: any) => {
    console.log(item, newValue);
    item === "sandLift" &&
      setTallyDesign(updateTallyInfo(tallyDesign, undefined, newValue));
    setBasicinfo((prev) => {
      let bwpd = prev.bhaInfo.bwpd;
      let bopd = prev.bhaInfo.bopd;
      let gor = prev.bhaInfo.gor;
      let glr = prev.bhaInfo.glr;
      if (item === "bfpd" || item === "waterCut" || item === "gasFlow") {
        const fluidProd = item === "bfpd" ? newValue : prev.bhaInfo.bfpd || 0;
        const waterFlow =
          item === "waterCut" ? newValue : prev.bhaInfo.waterCut || 0;
        const gasFlow =
          item === "gasFlow" ? newValue : prev.bhaInfo.gasFlow || 0;
        bwpd = +(fluidProd * (waterFlow / 100)).toFixed(2);
        bopd = +(fluidProd - bwpd).toFixed(2);
        gor = +((gasFlow * 1000) / bopd).toFixed(3);
        glr = +((gasFlow * 1000) / fluidProd).toFixed(3);
      }
      return {
        ...prev,
        bhaInfo: { ...prev.bhaInfo, [item]: newValue, bwpd, bopd, gor, glr },
      };
    });
  };

  const handleUpdateSolution = (
    item: string,
    value: any,
    data: any,
    simulator?: SimulatorProps
  ) => {
    if (item === "gasSolution") {
      setSolution((prev) => {
        return { ...prev, [item]: value, gasSimulator: data };
      });
    } else if (item === "sandSolution") {
      setSolution((prev) => {
        return { ...prev, [item]: value, sandSimulator: data };
      });
    } else if (item === "pressureSolution") {
      setSolution((prev) => {
        return { ...prev, [item]: value, pressureSimulator: data };
      });
    }
    if (simulator) setSimulator(simulator);
  };

  const handleUpdateTally = (
    index: number,
    newValue: any,
    wbdChanged?: boolean
  ) => {
    wbdChanged && updateWbdInfo(index, newValue);
    setTallyDesign((prev) => {
      let newTallyDesign = prev.map((item, i) => {
        if (index === i) return { ...item, ...newValue };
        return item;
      });
      return updateTallyInfo(newTallyDesign);
    });
  };

  const updateWbdInfo = (index: number, newValue: ProductProps) => {
    setWbdDesign((prev) => {
      return prev.map((item, i) => {
        if (index === i)
          return {
            ...item,
            tool: newValue,
            position: index,
            parentId: newValue.id,
          };
        return item;
      });
    });
  };

  const getTwoDecimals = (num: number) => {
    return parseFloat(num.toFixed(2));
  };

  const updateTallyInfo = (
    newTallyDesign: ProductProps[],
    depth?: number,
    sandLift?: boolean
  ) => {
    const baseDepth = depth || basicInfo.mdDepth || 0;
    const isSandLiftDesign = sandLift || basicInfo.bhaInfo.sandLift;
    const isTacAbove = basicInfo.bhaInfo.tac;
    return newTallyDesign.map((item, index) => {
      let topValue = 0,
        bottomValue = 0;
      if (
        (index === 0 && !isSandLiftDesign && basicInfo.sla.id === 1) ||
        (index === 0 && !isTacAbove && basicInfo.sla.id === 0)
      ) {
        topValue = getTwoDecimals(baseDepth - item.length * item.quantity);
        bottomValue = baseDepth;
      } else if (
        (index === 0 && isSandLiftDesign && basicInfo.sla.id === 1) ||
        (index === 0 && isTacAbove && basicInfo.sla.id === 0)
      ) {
        let nextValue = newTallyDesign[index + 1]
          ? newTallyDesign[index + 1].length *
            newTallyDesign[index + 1].quantity
          : 0;
        topValue = getTwoDecimals(
          baseDepth - item.length * item.quantity - nextValue
        );
        bottomValue = getTwoDecimals(baseDepth - nextValue);
      } else if (index === 0 && !isSandLiftDesign && basicInfo.sla.id !== 1) {
        topValue = baseDepth;
        bottomValue =
          baseDepth + newTallyDesign[0].length * newTallyDesign[0].quantity;
      } else if (
        (index === 1 && isSandLiftDesign && basicInfo.sla.id === 1) ||
        (index === 1 && isTacAbove && basicInfo.sla.id === 0)
      ) {
        topValue = getTwoDecimals(baseDepth - item.length * item.quantity);
        bottomValue = baseDepth;
      } else if (
        (index === 1 && !isSandLiftDesign && basicInfo.sla.id === 1) ||
        (index === 1 && !isTacAbove && basicInfo.sla.id === 0)
      ) {
        topValue = baseDepth;
        bottomValue = getTwoDecimals(baseDepth + item.length * item.quantity);
      } else if (index === 1 && !isSandLiftDesign && basicInfo.sla.id !== 1) {
        topValue =
          baseDepth + newTallyDesign[0].length * newTallyDesign[0].quantity;
        bottomValue =
          topValue + newTallyDesign[1].length * newTallyDesign[1].quantity;
      } else {
        topValue = getTopValue(baseDepth, index, newTallyDesign);
        bottomValue = getBottomValue(baseDepth, index, newTallyDesign);
      }
      let totalWeightValue: number = item.quantity * item.weight;
      return {
        ...item,
        top: topValue,
        bottom: bottomValue,
        totalWeight: totalWeightValue,
      };
    });
  };

  const getTopValue = (
    baseDepth: number,
    index: number,
    newTally: ProductProps[]
  ): number => {
    let sumOfLengths = baseDepth;
    for (let i = 0; i < index; i++) {
      if (i === 0) {
        if (basicInfo.sla.id === 1 || basicInfo.sla.id === 0) {
          sumOfLengths += 0;
        } else {
          sumOfLengths += newTally[i].length * newTally[i].quantity;
        }
      } else if (i === 1) {
        if (basicInfo.bhaInfo.sandLift) {
          sumOfLengths += 0;
        } else {
          sumOfLengths += newTally[i].length * newTally[i].quantity;
        }
      } else {
        sumOfLengths += newTally[i].length * newTally[i].quantity;
      }
    }
    return getTwoDecimals(sumOfLengths);
  };
  const getBottomValue = (
    baseDepth: number,
    index: number,
    newTally: ProductProps[]
  ): number => {
    let sumOfLengths = baseDepth;
    for (let i = 0; i <= index; i++) {
      if (i === 0) {
        if (basicInfo.sla.id === 1 || basicInfo.sla.id === 0) {
          sumOfLengths += 0;
        } else {
          sumOfLengths += newTally[i].length * newTally[i].quantity;
        }
      } else if (i === 1) {
        if (basicInfo.bhaInfo.sandLift) {
          sumOfLengths += 0;
        } else {
          sumOfLengths += newTally[i].length * newTally[i].quantity;
        }
      } else {
        sumOfLengths += newTally[i].length * newTally[i].quantity;
      }
    }
    return getTwoDecimals(sumOfLengths);
  };

  const handleAddOsiTool = (index?: number) => {
    if (index || index === 0) {
      let newWbdDesign = [
        ...wbdDesign.slice(0, index),
        new_wbd_item,
        ...wbdDesign.slice(index),
      ];
      setWbdDesign(newWbdDesign);
      let newTallyDesign = [
        ...tallyDesign.slice(0, index),
        new_tally_row,
        ...tallyDesign.slice(index),
      ];
      setTallyDesign(updateTallyInfo(newTallyDesign));
    } else {
      setWbdDesign((prev) => {
        return [...prev, { ...new_wbd_item, position: tallyDesign.length }];
      });
      setTallyDesign((prev) => {
        return [...prev, new_tally_row];
      });
    }
  };
  const handleAddInnerTool = (innerTool: ProductProps, index: number) => {
    setTallyDesign((prev) => {
      return prev.map((item, i) => {
        if (i === index) item["innerTools"] = { ...innerTool, osi: true };
        return item;
      });
    });
    setWbdDesign((prev) => {
      return prev.map((item, i) => {
        if (i === index) item.tool["innerTools"] = { ...innerTool, osi: true };
        return item;
      });
    });
  };

  const handleRemoveInnerTool = (index: number | null) => {
    if (index || index === 0) {
      setTallyDesign((prev) => {
        return prev.map((item, i) => {
          if (i === index) item["innerTools"] = undefined;
          return item;
        });
      });
      setWbdDesign((prev) => {
        return prev.map((item, i) => {
          if (i === index) item.tool["innerTools"] = undefined;
          return item;
        });
      });
    }
  };

  const handleAddCustomTool = (index?: number, newRow?: ProductProps) => {
    if (index || index === 0) {
      let newWbdDesign = [
        ...wbdDesign.slice(0, index),
        new_wbd_custom_item,
        ...wbdDesign.slice(index),
      ];
      setWbdDesign(newWbdDesign);
      let newTallyDesign = [
        ...tallyDesign.slice(0, index),
        new_tally_custom_row,
        ...tallyDesign.slice(index),
      ];
      setTallyDesign(updateTallyInfo(newTallyDesign));
    } else {
      setWbdDesign((prev) => {
        return [
          ...prev,
          { ...new_wbd_custom_item, position: tallyDesign.length },
        ];
      });
      setTallyDesign((prev) => {
        return [...prev, new_tally_custom_row];
      });
    }
  };

  const handleDeleteTallyRow = (index: number) => {
    setWbdDesign((prev) => {
      const newWbd = prev.filter((_, i) => i !== index);
      return newWbd;
    });
    setTallyDesign((prev) => {
      const newTally = prev.filter((_, i) => i !== index);
      return updateTallyInfo(newTally);
    });
  };

  const handleDeleteSalesRow = (index: number) => {
    setSalesInfo((prev) => {
      const newProducList = prev.productList.filter((_, i) => i !== index);
      return { ...prev, productList: newProducList };
    });
  };

  const handleChange3dWellbore = (newImage: string) => {
    setWellbore3dImg(newImage);
    setIsSuccess(true);
  };

  const handleFetchTechProp = (id: number | string) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `proposal/${id}`, options })
      .then((response) => {
        if (response.data) {
          const {
            tallyDesign,
            basicInfo,
            wbdDesign,
            solution,
            simulator,
            wellboreImage,
          } = response.data;
          setBasicinfo(basicInfo);
          setSolution(solution);
          setSimulator(simulator);
          setTallyDesign(tallyDesign);
          setWbdDesign(wbdDesign);
          setWellbore3dImg(wellboreImage);
          let salesItems: any = [];
          if (tallyDesign.length > 0) {
            let newTally = [...tallyDesign];
            for (let j = 0; j < newTally.length; j++) {
              if (newTally[j].innerTools)
                newTally.push({
                  ...newTally[j].innerTools,
                  quantity:
                    newTally[j].innerTools.quantity * newTally[j].quantity,
                });
            }
            const resultado = groupBy(newTally, "id");
            salesItems = Object.keys(resultado).map((key) => {
              if (resultado[key].length === 1) return resultado[key][0];
              else {
                let quantity = resultado[key][0].quantity;
                for (let i = 1; i < resultado[key].length; i++) {
                  quantity += resultado[key][i].quantity;
                }
                return { ...resultado[key][0], quantity };
              }
            });
          }
          setSalesInfo((prev) => {
            return {
              ...prev,
              client: basicInfo.client.name,
              phoneNumber: basicInfo.well.phoneNumber,
              contact: basicInfo.well.contact,
              wellName: basicInfo.well.name,
              wellId: basicInfo.well.id,
              productList: salesItems,
            };
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const groupBy = (objectArray: any, property: any) => {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];

      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  };

  const fetchDataTally = (id: number | string) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `tally/${id}`, options })
      .then((response) => {
        if (response.data) {
          const { tallyDesign, basicInfo, wbdDesign } = response.data;
          setBasicinfo(basicInfo);
          setTallyDesign(tallyDesign);
          setWbdDesign(wbdDesign);
          let salesItems: any = [];
          if (tallyDesign.length > 0) {
            let newTally = [...tallyDesign];
            for (let j = 0; j < newTally.length; j++) {
              if (newTally[j].innerTools)
                newTally.push({
                  ...newTally[j].innerTools,
                  quantity:
                    newTally[j].innerTools.quantity * newTally[j].quantity,
                });
            }
            const resultado = groupBy(newTally, "id");
            salesItems = Object.keys(resultado).map((key) => {
              if (resultado[key].length === 1) return resultado[key][0];
              else {
                let quantity = resultado[key][0].quantity;
                for (let i = 1; i < resultado[key].length; i++) {
                  quantity += resultado[key][i].quantity;
                }
                return { ...resultado[key][0], quantity };
              }
            });
          }
          setSalesInfo((prev) => {
            return {
              ...prev,
              client: basicInfo.client.name,
              phoneNumber: basicInfo.well.phoneNumber,
              contact: basicInfo.well.contact,
              wellName: basicInfo.well.name,
              wellId: basicInfo.well.id,
              productList: salesItems,
            };
          });
        }
      })
      .catch(() => setIsError(true));
  };

  const fetchDataSales = (id: number | string) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `sales/${id}`, options })
      .then((response) => {
        if (response.data) {
          setSalesInfo(response.data);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleFetchDataClient = () => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: "client", options })
      .then((response) => {
        if (response.data) {
          setClientOptions(response.data);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleFetchDataProducts = () => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: "product", options })
      .then((response) => {
        if (response.data) {
          setProductOptions(response.data);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleFetchDataWells = (id: number) => {
    setBasicinfo((prev) => {
      return {
        ...prev,
        well: { id: 0, name: "", contact: "", phoneNumber: "" },
      };
    });
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `well/client/${id}`, options })
      .then((response) => {
        if (response.data) {
          setWellOptions(response.data);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleSaveProp = () => {
    const data = {
      basicInfo,
      solution,
      simulator,
      tallyDesign,
      wellboreImage: wellbore3dImg,
      wbdDesign,
    };
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
    };
    handleRequest({ endpoint: "proposal", options })
      .then((response) => {
        if (response.data) {
          const id = response.data.id;
          setIsSuccess(true);
          navigate(`/tech/${id}`);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleEditProp = (techId: string) => {
    const data = {
      basicInfo,
      solution,
      simulator,
      tallyDesign,
      wellboreImage: wellbore3dImg,
      wbdDesign,
    };
    let options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    handleRequest({ endpoint: `proposal/${techId}`, options })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true));
  };

  const handleDeleteTechProp = (id: string) => {
    let options: RequestInit = {
      method: "DELETE",
    };
    handleRequest({ endpoint: `proposal/${id}`, options })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true));
  };

  const handleSaveTally = () => {
    const data = {
      basicInfo,
      tallyDesign,
      wbdDesign,
    };
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
    };
    handleRequest({ endpoint: "tally", options })
      .then((response) => {
        if (response.data) {
          const id = response.data.id;
          setIsSuccess(true);
          navigate(`/tally/${id}`);
        }
      })
      .catch(() => setIsError(true));
  };

  const handleEditTally = (tallyId: string) => {
    const data = {
      basicInfo,
      tallyDesign,
      wbdDesign,
    };
    let options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    handleRequest({ endpoint: `tally/${tallyId}`, options })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true));
  };

  const handleDeleteTally = (id: string) => {
    let options: RequestInit = {
      method: "DELETE",
    };
    handleRequest({ endpoint: `tally/${id}`, options })
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => setIsError(true));
  };

  const handleCreateClient = (name: string) => {
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ name }),
    };
    handleRequest({ endpoint: "client", options })
      .then((response) => {
        if (response.success) {
          handleFetchDataClient();
          setIsSuccess(true);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleEditClient = (id: number, name: string) => {
    let options: RequestInit = {
      method: "PUT",
      body: JSON.stringify({ name }),
    };
    handleRequest({ endpoint: `client/${id}`, options })
      .then((response) => {
        if (response.success) {
          handleFetchDataClient();
          setIsSuccess(true);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleCreateWell = (values: WellProps) => {
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        ...values,
        client: values.client || basicInfo.client,
      }),
    };
    handleRequest({ endpoint: "well", options })
      .then((response) => {
        if (response.success) {
          values.client && handleFetchDataWells(basicInfo.client.id);
          setIsSuccess(true);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleEditWell = (values: WellProps) => {
    let options: RequestInit = {
      method: "PUT",
      body: JSON.stringify({ ...values }),
    };
    handleRequest({ endpoint: `well/${values.id}`, options })
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleCreateTool = (values: ProductProps) => {
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify(values),
    };
    handleRequest({ endpoint: `product`, options })
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleEditTool = (values: ProductProps, index?: number) => {
    if (index || index === 0) handleUpdateTally(index, values, true);
    if (values.osi) {
      let options: RequestInit = {
        method: "PUT",
        body: JSON.stringify(values),
      };
      handleRequest({ endpoint: `product/${values.id}`, options })
        .then(() => setIsSuccess(true))
        .catch(() => setIsError(true));
    } else {
      setIsModalOpen(false);
      let options: RequestInit = {
        method: "PUT",
        body: JSON.stringify(values),
      };
      handleRequest({ endpoint: `custom-tool/${values.id}`, options })
        .then(() => setIsSuccess(true))
        .catch(() => setIsError(true));
    }
  };

  const handleCreateSales = () => {
    const subject = `SALES ORDER - ${salesInfo.client} - ${salesInfo.wellName}`;
    let options: RequestInit = {
      method: "POST",
      body: JSON.stringify(salesInfo),
    };
    handleRequest({ endpoint: "sales", options })
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
          const { id } = response.data;
          let body = `Team,\nPlease help us with the following order.\n\n${window.location.origin}/sales/${id}`;
          window.location.assign(
            "mailto:orders@odsep.com?Subject=" +
              subject +
              "&body=" +
              encodeURIComponent(body)
          );
          navigate(`/sales/${id}`);
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleEditSales = (id: string | number) => {
    const subject = `SALES ORDER - ${salesInfo.client} - ${salesInfo.wellName}`;
    let options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(salesInfo),
    };
    handleRequest({ endpoint: `sales/${id}`, options })
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
          let body = `Team,\nPlease help us with the following order.\n\n${window.location.origin}/sales/${id}`;
          window.location.assign(
            "mailto:orders@odsep.com?Subject=" +
              subject +
              "&body=" +
              encodeURIComponent(body)
          );
        } else throw Error;
      })
      .catch(() => setIsError(true));
  };

  const handleExportExcel = (format: ExportType) => {
    try {
      const data = tallyDesign.map((item) => {
        return (
          item.id && {
            Description: item.name || item.description,
            "Top Thread Connection": item.topThreadConnection || "",
            "Bottom Thread Connection": item.bottomThreadConnection || "",
            Status: item.status.name || "",
            "Max. OD (in)": item.maxOD || "",
            "Body OD (in)": item.bodyOD || "",
            "Length (ft)": item.length || 0,
            "Top (ft)": item.top || 0,
            "Bottom (ft)": item.bottom || 0,
            "Weight (lb)": item.weight || 0,
          }
        );
      });
      const fileName = `${basicInfo.customName} ${basicInfo.client.name} ${basicInfo.well.name}`;
      const exportType = format;
      exportFromJSON({ data, fileName, exportType });
    } catch {
      setIsError(true);
    }
  };

  const handleCreatePdf = () => {
    const tol = basicInfo.bhaInfo.tol;
    let allWellboreArray: WbdItemProps[] = [];
    for (let j = 0; j < wbdDesign.length; j++) {
      const top = tallyDesign[j].top;
      const bottom = tallyDesign[j].bottom;
      const isTol = top && bottom && tol && top <= tol && bottom >= tol;
      let item = wbdDesign[j];
      if (item.tool.quantity === 1 && item.tool.id !== 0) {
        if (isTol) item = { ...item, tol: true };
        allWellboreArray.push(item);
      } else if (
        item.tool.quantity !== 1 &&
        item.tool.quantity !== 0 &&
        item.tool.id !== 0
      ) {
        let totalTools = Array.from(
          { length: item.tool.quantity },
          (_, index) => {
            const {
              tool: { length },
            } = item;
            if (isTol) {
              const temp = tol - top;
              const toolIndex = Math.floor(temp / length);
              if (toolIndex === index) return { ...item, tol: true };
            }
            return item;
          }
        );

        allWellboreArray.push(...totalTools);
      }
    }
    let design: WbdItemProps[][] = [];
    let firstPageWbd = [],
      sizeCountFirstPage = 0,
      leftIndex = 0;
    for (let i = 0; i < allWellboreArray.length; i++) {
      sizeCountFirstPage += allWellboreArray[i].tool.size || 1;
      if (sizeCountFirstPage < 30) {
        firstPageWbd.push(allWellboreArray[i]);
        leftIndex += 1;
      }
    }
    design.push(firstPageWbd);
    let restAfterFirstPage = allWellboreArray.filter(
      (_, index) => index >= leftIndex
    );
    if (restAfterFirstPage.length > 0) {
      const sizeLeft = restAfterFirstPage.reduce(
        (acc, curr) => acc + curr.tool.size || 1,
        0
      );
      const numberOfPages = Math.ceil(sizeLeft / 30);
      if (numberOfPages > 0) {
        let firstItem = 0;
        for (let x = 0; x < numberOfPages; x++) {
          let newPage = [];
          let sizeCount = 0;
          for (let i = firstItem; i < restAfterFirstPage.length; i++) {
            if (sizeCount < 35) {
              sizeCount += restAfterFirstPage[i].tool.size || 1;
              newPage.push(restAfterFirstPage[i]);
              firstItem++;
            }
          }
          newPage.length > 0 && design.push(newPage);
        }
      } else {
        let sizeCount = 0;
        let newPage = [];
        for (let i = 0; i < restAfterFirstPage.length; i++) {
          sizeCount += restAfterFirstPage[i].tool.size || 1;
          if (sizeCount < 30) {
            newPage.push(restAfterFirstPage[i]);
          }
        }
        newPage.length > 0 && design.push(newPage);
      }
    }
    setDesignByPage(design);
  };

  const handleResetValues = () => {
    setBasicinfo(basic_initial_state);
    setSolution(initial_solution_state);
    setTallyDesign([]);
    setWbdDesign([]);
    setWellbore3dImg("");
    setSalesInfo(initial_sales_state);
  };

  const handleCancelEdition = () => {
    handleResetValues();
    navigate("/home");
  };

  return (
    <DataContext.Provider
      value={{
        onUpdateBasicInfo: handleUpdateBasicInfo,
        onUpdateSalesInfo: handleUpdateSalesInfo,
        onUpdateBha: handleUpdateBhaDesign,
        onUpdateSolution: handleUpdateSolution,
        onUpdateTally: handleUpdateTally,
        onUpdateSalesProductList: handleUpdateSalesProductList,
        onAddProductToSales: hanleAddProductToSales,
        onAddTool: handleAddOsiTool,
        onAddInnerTool: handleAddInnerTool,
        onRemoveInnerTool: handleRemoveInnerTool,
        onAddCustomTool: handleAddCustomTool,
        onChangeMudWeight: (value) => setMudWeight(value),
        onChangeTotalLength: (value) => setTotalLength(value),
        onChangeTotalWeight: (value) => setTotalWeight(value),
        onChangeLastBottom: (value) => setLastBottom(value),
        onDeleteTallyRow: handleDeleteTallyRow,
        onDeleteSalesRow: handleDeleteSalesRow,
        onCancelEdition: handleCancelEdition,
        fetchDataTechProp: handleFetchTechProp,
        fetchDataTally: fetchDataTally,
        fetchDataClient: handleFetchDataClient,
        fetchDataWells: handleFetchDataWells,
        fetchDataProducts: handleFetchDataProducts,
        fetchDataSales: fetchDataSales,
        onSaveProp: handleSaveProp,
        onEditprop: handleEditProp,
        onDeleteProp: handleDeleteTechProp,
        onSaveTally: handleSaveTally,
        onEditTally: handleEditTally,
        onDeleteTally: handleDeleteTally,
        onCreateClient: handleCreateClient,
        onEditClient: handleEditClient,
        onCreateWell: handleCreateWell,
        onEditWell: handleEditWell,
        onCreateTool: handleCreateTool,
        onEditTool: handleEditTool,
        onCreateSales: handleCreateSales,
        onEditSales: handleEditSales,
        onExportExcel: handleExportExcel,
        onCreatePdf: handleCreatePdf,
        onResetValues: handleResetValues,
        onCloseModal: () => setIsModalOpen(false),
        onOpenModal: () => setIsModalOpen(true),
        onChangeW3d: handleChange3dWellbore,
        clientOptions,
        wellOptions,
        productOptions,
        data: {
          basicInfo,
          salesInfo,
          solution,
          simulator,
          tallyDesign,
          wbdDesign,
          wellbore3dImg,
          designByPage,
          mudWeight,
          totalLenght,
          totalWeight,
          lastBottom,
        },
        isModalOpen,
        toSave,
        orderIsReady,
        isSuccess,
        isError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
