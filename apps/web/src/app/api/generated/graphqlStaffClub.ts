export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type BarSale = {
  __typename?: 'BarSale';
  _id?: Maybe<Scalars['ID']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Member>;
  date?: Maybe<Scalars['Date']['output']>;
  items?: Maybe<Array<Maybe<BeerBrandType>>>;
  memberID: Scalars['ID']['output'];
  paymentType?: Maybe<PaymentTypeEnum>;
  saleType?: Maybe<SaleTypeEnum>;
  seller?: Maybe<Staff>;
  staffID: Scalars['ID']['output'];
};

export type BarStock = {
  __typename?: 'BarStock';
  Supplier?: Maybe<Supplier>;
  amount: Scalars['String']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  itemsSupplied?: Maybe<Array<ItemSupplied>>;
  saleType: PaymentTypeEnum;
  supplierID: Scalars['ID']['output'];
};

export type BaseError = {
  message: Scalars['String']['output'];
};

export type BeerBrandInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type BeerBrandType = {
  __typename?: 'BeerBrandType';
  brand?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type Bio = Member | Staff;

export type DrinksBank = {
  __typename?: 'DrinksBank';
  _id?: Maybe<Scalars['ID']['output']>;
  allDrinksCollected?: Maybe<Scalars['Boolean']['output']>;
  collectedDates?: Maybe<Array<Maybe<DrinksCollector>>>;
  dateBanked?: Maybe<Scalars['Date']['output']>;
  drinksLeft?: Maybe<Array<Maybe<BeerBrandType>>>;
  items?: Maybe<Array<Maybe<BeerBrandType>>>;
  memberID?: Maybe<Scalars['ID']['output']>;
  receivingStaff?: Maybe<Staff>;
  staffID?: Maybe<Scalars['ID']['output']>;
};

export type DrinksCollector = {
  __typename?: 'DrinksCollector';
  date?: Maybe<Scalars['Date']['output']>;
  staff?: Maybe<Staff>;
  staffId?: Maybe<Scalars['ID']['output']>;
};

export type DuesPayment = {
  __typename?: 'DuesPayment';
  _id?: Maybe<Scalars['ID']['output']>;
  amountPaid?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  member?: Maybe<Member>;
  memberID?: Maybe<Scalars['ID']['output']>;
  paymentFor?: Maybe<Array<Maybe<PaymentFor>>>;
  paymentType?: Maybe<PaymentTypeEnum>;
};

export type FindMembersCursorOutput = {
  __typename?: 'FindMembersCursorOutput';
  members?: Maybe<Array<Maybe<Member>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InvalidInputError = BaseError & {
  __typename?: 'InvalidInputError';
  message: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  _id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  numberInCrate: Scalars['Int']['output'];
  sellingPrice: Scalars['String']['output'];
  totalStock: Scalars['Int']['output'];
};

export type ItemSupplied = {
  __typename?: 'ItemSupplied';
  brand?: Maybe<Scalars['String']['output']>;
  numberOfBottles?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type ItemSuppliedInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  numberOfBottles?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Member = {
  __typename?: 'Member';
  _id?: Maybe<Scalars['ID']['output']>;
  birthDay?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  drinksBanked?: Maybe<Array<Maybe<DrinksBank>>>;
  drinksBought?: Maybe<Array<Maybe<BarSale>>>;
  dues?: Maybe<Array<Maybe<DuesPayment>>>;
  email?: Maybe<Scalars['String']['output']>;
  employer?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  memberID: Scalars['ID']['output'];
  membershipType?: Maybe<MembershipTypeEnum>;
  nextOfKin?: Maybe<Scalars['String']['output']>;
  paymentReceived?: Maybe<Array<Maybe<Payment>>>;
  sex?: Maybe<SexEnum>;
  surname: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type MemberOrderBy = {
  direction?: InputMaybe<OrderDirection>;
  field?: InputMaybe<OrderableMemberField>;
};

export type MemberResult = Member | NotFound;

export type Mutation = {
  __typename?: 'Mutation';
  addBankedDrinks?: Maybe<DrinksBank>;
  addBarStock?: Maybe<BarStock>;
  addDuesPayment?: Maybe<DuesPayment>;
  addItemToDB?: Maybe<Item>;
  addMember?: Maybe<Member>;
  addNewSupplier?: Maybe<Supplier>;
  addPayment?: Maybe<Payment>;
  addStaff?: Maybe<Staff>;
  collectBankedDrinks?: Maybe<DrinksBank>;
  createUserAccount?: Maybe<User>;
  newBarSale?: Maybe<BarSale>;
  updateMember?: Maybe<Member>;
  updateStaff?: Maybe<Staff>;
  updateSupplier?: Maybe<Supplier>;
};


export type MutationAddBankedDrinksArgs = {
  request: AddBankedDrinksInput;
};


export type MutationAddBarStockArgs = {
  request: AddBarStockInput;
};


export type MutationAddDuesPaymentArgs = {
  request: AddDuesPaymentInput;
};


export type MutationAddItemToDbArgs = {
  request: AddItemInput;
};


export type MutationAddMemberArgs = {
  request: AddMemberInput;
};


export type MutationAddNewSupplierArgs = {
  request: AddSupplierInput;
};


export type MutationAddPaymentArgs = {
  request: AddPaymentInput;
};


export type MutationAddStaffArgs = {
  request: AddStaffInput;
};


export type MutationCollectBankedDrinksArgs = {
  request: CollectBankedDrinksInput;
};


export type MutationCreateUserAccountArgs = {
  request: AddCreateUserInput;
};


export type MutationNewBarSaleArgs = {
  request: NewBarSaleInput;
};


export type MutationUpdateMemberArgs = {
  request: UpdateMemberInput;
};


export type MutationUpdateStaffArgs = {
  request: UpdateStaffInput;
};


export type MutationUpdateSupplierArgs = {
  request: UpdateSupplierInput;
};

export type NextOfKin = {
  __typename?: 'NextOfKin';
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NextOfKinInput = {
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type NotAllowedError = BaseError & {
  __typename?: 'NotAllowedError';
  message: Scalars['String']['output'];
};

export type NotFound = {
  __typename?: 'NotFound';
  message?: Maybe<Scalars['String']['output']>;
};

export type NotFoundError = BaseError & {
  __typename?: 'NotFoundError';
  message: Scalars['String']['output'];
};

export type OrderBy = {
  direction?: InputMaybe<OrderDirection>;
  field?: InputMaybe<OrderField>;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderField {
  JobTitle = 'jobTitle',
  MemberId = 'memberID'
}

export enum OrderableMemberField {
  Id = '_id',
  JobTitle = 'jobTitle',
  MemberId = 'memberID'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  end?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  _id?: Maybe<Scalars['ID']['output']>;
  amountPaid?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  paymentCategory?: Maybe<PaymentCategoryEnum>;
  paymentFor?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<ReceiverResult>;
  receiverID?: Maybe<Scalars['ID']['output']>;
};

export type PaymentFor = {
  __typename?: 'PaymentFor';
  month?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaymentForInput = {
  month?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  findMember?: Maybe<MemberResult>;
  findMemberDuesPaid?: Maybe<Array<Maybe<DuesPayment>>>;
  findMemberPatronage?: Maybe<Array<Maybe<BarSale>>>;
  findMembers?: Maybe<FindMembersCursorOutput>;
  findStaff?: Maybe<StaffResult>;
  getStockSuppliedBySupplier?: Maybe<Array<Maybe<BarStock>>>;
  getSuppliers?: Maybe<Array<Maybe<Supplier>>>;
};


export type QueryFindMemberArgs = {
  request?: InputMaybe<FindMemberInput>;
};


export type QueryFindMemberDuesPaidArgs = {
  request: FindMemberDuesPaidInput;
};


export type QueryFindMemberPatronageArgs = {
  request: FindMemberPatronageInput;
};


export type QueryFindMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MemberOrderBy>;
  request?: InputMaybe<FindMembersInput>;
};


export type QueryFindStaffArgs = {
  request?: InputMaybe<FindStaffInput>;
};


export type QueryGetStockSuppliedBySupplierArgs = {
  request: FindBarStockInput;
};

export type ReceiverResult = Member | Staff | Supplier;

export type Staff = {
  __typename?: 'Staff';
  _id?: Maybe<Scalars['ID']['output']>;
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  dateOfEmployment?: Maybe<Scalars['Date']['output']>;
  employeeID: Scalars['ID']['output'];
  employmentStatus?: Maybe<EmploymentStatusEnum>;
  employmentType?: Maybe<EmploymentTypeEnum>;
  firstname: Scalars['String']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  nextOfKin?: Maybe<NextOfKin>;
  salary?: Maybe<Array<Maybe<Payment>>>;
  sex?: Maybe<SexEnum>;
  surname: Scalars['String']['output'];
};

export type StaffResult = NotFound | Staff;

export type Supplier = {
  __typename?: 'Supplier';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  drinks?: Maybe<Array<Maybe<BarStock>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UnknownError = BaseError & {
  __typename?: 'UnknownError';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  bio?: Maybe<Bio>;
  bioDataId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleEnum>;
  username?: Maybe<Scalars['String']['output']>;
};

export type AddBankedDrinksInput = {
  dateBanked?: InputMaybe<Scalars['Date']['input']>;
  drinksLeft?: InputMaybe<Array<InputMaybe<BeerBrandInput>>>;
  items?: InputMaybe<Array<InputMaybe<BeerBrandInput>>>;
  memberID?: InputMaybe<Scalars['ID']['input']>;
  staffID?: InputMaybe<Scalars['ID']['input']>;
};

export type AddBarStockInput = {
  amount: Scalars['String']['input'];
  itemsSupplied?: InputMaybe<Array<ItemSuppliedInput>>;
  saleType: PaymentTypeEnum;
  supplierID: Scalars['ID']['input'];
};

export type AddCreateUserInput = {
  bioDataId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AddDuesPaymentInput = {
  amountPaid?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  memberID?: InputMaybe<Scalars['ID']['input']>;
  paymentFor?: InputMaybe<Array<InputMaybe<PaymentForInput>>>;
  paymentType?: InputMaybe<PaymentTypeEnum>;
};

export type AddItemInput = {
  name: Scalars['String']['input'];
  numberInCrate: Scalars['Int']['input'];
  sellingPrice: Scalars['String']['input'];
  totalStock: Scalars['Int']['input'];
};

export type AddMemberInput = {
  birthDay?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  employer?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  memberID: Scalars['ID']['input'];
  membershipType?: InputMaybe<MembershipTypeEnum>;
  nextOfKin?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<SexEnum>;
  surname: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AddPaymentInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  amountPaid?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  paymentCategory?: InputMaybe<PaymentCategoryEnum>;
  paymentFor?: InputMaybe<Scalars['String']['input']>;
  receiverID?: InputMaybe<Scalars['ID']['input']>;
};

export type AddStaffInput = {
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dateOfEmployment?: InputMaybe<Scalars['Date']['input']>;
  employeeID: Scalars['ID']['input'];
  employmentStatus?: InputMaybe<EmploymentStatusEnum>;
  employmentType?: InputMaybe<EmploymentTypeEnum>;
  firstname: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  nextOfKin?: InputMaybe<NextOfKinInput>;
  sex?: InputMaybe<SexEnum>;
  surname: Scalars['String']['input'];
};

export type AddSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  supplierID?: InputMaybe<Scalars['ID']['input']>;
};

export type CollectBankedDrinksInput = {
  drinksToCollect?: InputMaybe<Array<BeerBrandInput>>;
  memberID: Scalars['ID']['input'];
  staffID: Scalars['ID']['input'];
};

export enum EmploymentStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export enum EmploymentTypeEnum {
  Contract = 'CONTRACT',
  Fulltime = 'FULLTIME',
  Parttime = 'PARTTIME'
}

export type FindBarStockInput = {
  _id: Scalars['ID']['input'];
};

export type FindMemberDuesPaidInput = {
  memberID: Scalars['ID']['input'];
};

export type FindMemberInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  memberID?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type FindMemberPatronageInput = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  memberID: Scalars['ID']['input'];
  paymentType?: InputMaybe<PaymentTypeEnum>;
  saleType?: InputMaybe<SaleTypeEnum>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type FindMembersInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jobTitle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  memberType?: InputMaybe<Scalars['String']['input']>;
};

export type FindStaffInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  employeeID?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export enum MembershipTypeEnum {
  Associate = 'ASSOCIATE',
  Full = 'FULL'
}

export type NewBarSaleInput = {
  amount: Scalars['String']['input'];
  items?: InputMaybe<Array<BeerBrandInput>>;
  memberID: Scalars['ID']['input'];
  paymentType: PaymentTypeEnum;
  saleType: SaleTypeEnum;
  staffID: Scalars['ID']['input'];
};

export enum PaymentCategoryEnum {
  Palliative = 'PALLIATIVE',
  Purchases = 'PURCHASES',
  Repairs = 'REPAIRS',
  Salary = 'SALARY',
  Workmanship = 'WORKMANSHIP'
}

export enum PaymentTypeEnum {
  Bank = 'BANK',
  Cash = 'CASH',
  Credit = 'CREDIT',
  Transfer = 'TRANSFER'
}

export enum RoleEnum {
  Admin = 'ADMIN',
  Barsecretary = 'BARSECRETARY',
  President = 'PRESIDENT',
  Sales = 'SALES',
  Secretary = 'SECRETARY',
  Treasurer = 'TREASURER'
}

export enum SaleTypeEnum {
  Normal = 'NORMAL',
  Presidential = 'PRESIDENTIAL'
}

export enum SexEnum {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type UpdateMemberInput = {
  _id: Scalars['ID']['input'];
  birthDay?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  employer?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  memberID?: InputMaybe<Scalars['ID']['input']>;
  membershipType?: InputMaybe<MembershipTypeEnum>;
  nextOfKin?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<SexEnum>;
  surname?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStaffInput = {
  _id: Scalars['ID']['input'];
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dateOfEmployment?: InputMaybe<Scalars['Date']['input']>;
  employeeID?: InputMaybe<Scalars['ID']['input']>;
  employmentStatus?: InputMaybe<EmploymentStatusEnum>;
  employmentType?: InputMaybe<EmploymentTypeEnum>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  nextOfKin?: InputMaybe<NextOfKinInput>;
  sex?: InputMaybe<SexEnum>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  supplierID: Scalars['ID']['input'];
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BaseError": [
      "InvalidInputError",
      "NotAllowedError",
      "NotFoundError",
      "UnknownError"
    ],
    "Bio": [
      "Member",
      "Staff"
    ],
    "MemberResult": [
      "Member",
      "NotFound"
    ],
    "ReceiverResult": [
      "Member",
      "Staff",
      "Supplier"
    ],
    "StaffResult": [
      "NotFound",
      "Staff"
    ]
  }
};
      export default result;
    