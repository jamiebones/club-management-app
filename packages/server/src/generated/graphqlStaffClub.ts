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
  _id: Scalars['ID']['output'];
  amount?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Member>;
  date?: Maybe<Scalars['Date']['output']>;
  items?: Maybe<Array<Maybe<BeerBrandType>>>;
  memberID?: Maybe<Scalars['ID']['output']>;
  paymentType?: Maybe<PaymentTypeEnum>;
  saleType?: Maybe<SaleTypeEnum>;
  seller?: Maybe<Staff>;
  staffID?: Maybe<Scalars['ID']['output']>;
};

export type BarStock = {
  __typename?: 'BarStock';
  Supplier?: Maybe<Supplier>;
  amount?: Maybe<Scalars['String']['output']>;
  amountOwnedSupplier?: Maybe<Scalars['String']['output']>;
  amountPaidToSupplier?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  fullPaymentMade?: Maybe<Scalars['Boolean']['output']>;
  itemsSupplied?: Maybe<Array<Maybe<ItemSupplied>>>;
  saleType?: Maybe<PaymentTypeEnum>;
  supplierID?: Maybe<Scalars['ID']['output']>;
};

export type BaseError = {
  message: Scalars['String']['output'];
};

export type BeerBrandType = {
  __typename?: 'BeerBrandType';
  brand?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
};

export type DrinksBank = {
  __typename?: 'DrinksBank';
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
};

export type DuesPayment = {
  __typename?: 'DuesPayment';
  _id: Scalars['ID']['output'];
  amountPaid?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  member?: Maybe<Member>;
  memberID?: Maybe<Scalars['String']['output']>;
  paymentFor?: Maybe<Scalars['String']['output']>;
  paymentPurpose?: Maybe<PaymentCategoryEnum>;
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

export type ItemSupplied = {
  __typename?: 'ItemSupplied';
  brand?: Maybe<Scalars['String']['output']>;
  numberOfBottles?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
};

export type Member = {
  __typename?: 'Member';
  _id?: Maybe<Scalars['ID']['output']>;
  birthDay?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  email?: Maybe<Scalars['String']['output']>;
  employer?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  memberID: Scalars['ID']['output'];
  membershipType?: Maybe<MembershipTypeEnum>;
  nextOfKin?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<SexEnum>;
  surname: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type MemberOrderBy = {
  direction?: InputMaybe<OrderDirection>;
  field?: InputMaybe<OrderableMemberField>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember?: Maybe<Member>;
  updateMember?: Maybe<Member>;
};


export type MutationAddMemberArgs = {
  request: AddMemberInput;
};


export type MutationUpdateMemberArgs = {
  request: UpdateMemberInput;
};

export type NextOfKin = {
  __typename?: 'NextOfKin';
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotAllowedError = BaseError & {
  __typename?: 'NotAllowedError';
  message: Scalars['String']['output'];
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
  _id: Scalars['ID']['output'];
  amountPaid?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  paymentCategory?: Maybe<PaymentCategoryEnum>;
  paymentFor?: Maybe<Scalars['String']['output']>;
  receiverID?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findMember?: Maybe<Member>;
  findMembers?: Maybe<FindMembersCursorOutput>;
};


export type QueryFindMemberArgs = {
  request?: InputMaybe<FindMemberInput>;
};


export type QueryFindMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MemberOrderBy>;
  request?: InputMaybe<FindMembersInput>;
};

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

export type Supplier = {
  __typename?: 'Supplier';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  supplierID: Scalars['ID']['output'];
};

export type UnknownError = BaseError & {
  __typename?: 'UnknownError';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  bioDataID?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
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

export type FindMemberInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  memberID?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type FindMembersInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jobTitle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  memberType?: InputMaybe<Scalars['String']['input']>;
};

export enum MembershipTypeEnum {
  Associate = 'ASSOCIATE',
  Full = 'FULL'
}

export enum PaymentCategoryEnum {
  Palliative = 'PALLIATIVE',
  Purchases = 'PURCHASES',
  Repairs = 'REPAIRS',
  Salary = 'SALARY',
  Workmanship = 'WORKMANSHIP'
}

export enum PaymentTypeEnum {
  Cash = 'CASH',
  Credit = 'CREDIT',
  Transfer = 'TRANSFER'
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
    ]
  }
};
      export default result;
    