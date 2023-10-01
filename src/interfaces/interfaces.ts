export interface UserDataProps {
  idRol: number;
  name: string;
  user: string;
  userId: number;
  client: boolean;
  clientId?: number;
}

export interface ProposalProps  {
  company: string;
  well: string;
  sla: string;
}

export interface ClientProps {
  id: number
  name: string;
  wells?: WellProps[] | []
}

export interface WellProps {
  id?: number;
  name: string;
  contact: string;
  phoneNumber: string;
  client?: {id: number, name: string}
}

export interface SlaProps{
  id: number; 
  name: string; 
  reqField: string | null;
  image: string | null
}

export  interface ProductProps {
  id: number;
  partNumber: string;
  name: string;
  description: string;
  supplier: string;
  topThreadConnection: string;
  bottomThreadConnection: string;
  status: {id: number, name: string}
  maxOD: string;
  bodyOD: string;
  length: number;
  quantity: number;
  weight: number;
  top?: number;
  bottom?: number;
  totalWeight?: number;
  osi: boolean
  tailJoint?: boolean;
  espAssembly?: boolean;
  espShrouded?:boolean;
  seatingNipple?: boolean;
  mechanicalPacker?: boolean;
  imagePath: null | string;
  size: number;
  isCompound?: boolean;
  auxText?: string
  innerTools?: ProductProps

}

export interface TallyItemProps {
  id: number | null;
  partNumber: string;
  description: string;
  supplier: string;
  topThreadConnection: string;
  bottomThreadConnection: string;
  status: {id: number, name: string}
  maxOD: string;
  bodyOD: string;
  length: number;
  quantity?: number;
  weight: number;
  top?: number;
  bottom?: number
}



export interface PostResponse {
  success: boolean;
}

export interface ProdChartProps {
  labels?: string[];
  dataset1?: number[];
  dataset2?: number[];
  dataset3?: number[];
}


export interface BhaProps {
  casingOd: string;
  weight: string | null;
  casingId: string | null;
  driftCasing: string | null;
  tubing: string | null;
  bfpd: number | null;
  bwpd: number | null;
  bopd: number | null;
  waterCut: number | null;
  gasFlow: number | null;
  gor: number | null;
  glr: number | null;
  tol: number | null;
  horizontal: boolean | null;
  sandLift: boolean | null;
  glPacker: boolean | null
  tac: boolean | null

}

export interface BasicInfoprops {
  customName: string;
  client: ClientProps;
  well: WellProps;
  sla: SlaProps;
  mdDepth: number;
  totalDepth: number;
  prodChartData: ProdChartProps
  prodImage: string;
  bhaInfo?: BhaProps
}

export interface SolutionProps {
  sandSolution: boolean;
  sandSimulator: {
    data: SandSimulatorProps,
    results: SandSimulatorResultProps,
   
  };
  gasSolution: boolean;
  gasSimulator: {
    data: GasSimulatorProps,
    results: GasSimulatorResultProps;
    
  };
  pressureSolution: boolean;
  pressureSimulator: {
    data: PressureSimulatorProps,
    results: PressureSimulatorResultProps;
  };
}

export interface SimulatorProps {
  sand: {
    tubingScreen: boolean;
    pumpGuard: boolean;
    superPerf: boolean;
  };
  gas: {
    gforce: boolean;
    packerType: boolean;
    poorBoy: boolean;
  };
  pressure: {
    dipTube: boolean;
    tubingScreenDP: boolean
  }
}

export interface WbdItemProps{
  position: number;
  tool: ProductProps;
  perforations: boolean;
  tol: boolean;
  last: boolean
  tempImage: string | null;
  parentId?: number
}


export interface DataProps {
  basicInfo: BasicInfoprops;
  salesInfo: SalesItemProp;
  solution: SolutionProps;
  simulator: SimulatorProps;
  tallyDesign: ProductProps[];
  wellbore3dImg: string | null;
  wbdDesign: WbdItemProps[];
  designByPage: WbdItemProps[][];
  mudWeight?: number;
  totalLenght?: number;
  totalWeight?: number
  lastBottom?: number
}

export interface TechListProps {
  id: number;
  basicInfo: BasicInfoprops;
  customName: string;
  date: string;
  sla: number;
}

export interface SalesItemProp {
    id:number;
    orderDate: string;
    quoteNumber: string;
    client: string;
    city: string;
    stateZip: string;
    country: string;
    phoneNumber: string;
    email: string;
    contact: string;
    po: string;
    needBy: string;
    wellName: string;
    directions: string;
    deliveryContact: string;
    salesmanContact: string;
    specialNotes: string;
    productList: ProductProps[],
    wellId: number;
}


export interface GasSimulatorProps {
  packerlessSize: string;
  numberGasBodies: number;
  gasBodyDimensions: string;
  percentageRuntime: number;
  plungerSize: number;
  strokeLength: number;
  pumpSpeed: number;
  pumpCapacity: number;
  pumpCapacityByStroke: number;
  bfpd: number;
  wCut: number;
  bopd: number;
  bwpd: number;
  gasRate:number;
  glr: number;
  wor: number;
  gor: number;
  temperature: number;
  pip: number;
  casingId: number;
  tubingOd: number;
  neckOD: number;
  gasSeparatorOD: number;
  gasSeparatorId: number;
  ODdiptube: number;
  waterSP: number;
  gasSP: number;
  oilApi: number;
  oilSP: number;
  interfacialTension: number;
  gravitationalForce: number;
  gasSeparatorLength: number 
}

export interface GasSimulatorResultProps {
  correlationTempAndOilApi: number;
  deviationFactor: number;
  pseudoCriticalTemperature: number;
  pseudoCriticalPressure: number;
  pseudoReducedTemperature: number;
  pseudoReducedPressure: number;
  solutionGas: number;
  correlationSolutionGas: number;
  oilVolumeFactor: number;
  waterVolumeFactor: number;
  gasVolumeFactor: number;
  gasDensity: number;
  liquidDensity: number 
  freeGasEnteringPump: number;
  gasBubbleTerminalVelocity: number;
  crossSectionalArea: number;
  inSituSuperficialLiquidVelocity: number;
  naturalSeparationEfficiency?: number;
  freeGasEnteringPumbWithSeparator: number;
  quiteZoneVolume: number;
  effectiveStrokes: number;
  retentionTime: number
}

export type pumpGuardOptions = 0.006 | 0.012 | 0.018 | 0.025 | 0.035 | 0.05 | 0.075 | 0.125

export interface SandSimulatorProps {
  bfpd: number;
  percentageRuntime: number;
  selectedTubingScreen: string;
  selectedSuperPerf: string;
  selectedPumbGuard: string;
  slot: string;
  slotPg: string;
  slotSp: string;
  wellClasification: string;
  openAreaOfScreen: number;
  numberOfTubingScreen: number;
  numberOfPumpGuard: number;
}



export interface SandSimulatorResultProps {
  sizeOfSand: number;
  totalOpenAreaOfScreen: number;
  minutePerDay: number;
  productionPerMinuteOfRun: number;
  productionCubicInches: number;
  productionInchByOpening: number;
  maxByTs: number;
}

export interface PressureSimulatorProps {
  bfpd: number;
  wCut: number;
  DipTubId: number;
  dipTubeLength: number;
  bopd: number;
  bwpd: number;
  gasRate: number;
  gor: number;
  api: number;
  spo: number;
  sp: number;
  spw: number;
  viscocity: number;
  numberOfTubingScreen: number;
  diameter: number;
  slotSize: string;
  openArea: number;
  screenLength: number;
  pip: number;
  deltaP: number;
  refDepth: number;
  resPressure: number;
  temperature: number;
  gasViscosity: number;
  ap: number;
  surfTension: number;
  avgPressure: number;
  rs: number;
  bo: number;
  prd: number;
  trd: number;
  z: number
}

export interface PressureSimulatorResultProps {
  waterRate: number;
  flowRegime: number;
  oilRate: number;
  relativeRoughness: number;
  velocity: number;
  reynolds: number;
  ed: number;
  frictionFactor: number;
  f: number;
  deltaP: number;
  screenAperture: number;
  freeArea: number;
  fluidDensity: number;
  fluidVelocity: number;
  dischargeCoefficient: any;
  lossPressCoeff: number;
  lossPressure: number;
}


