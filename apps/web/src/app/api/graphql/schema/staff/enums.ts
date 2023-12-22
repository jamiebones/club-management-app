import gql from 'graphql-tag';

export default gql.gql`

enum employmentTypeEnum {
    FULLTIME
	PARTTIME
    CONTRACT
}

enum employmentStatusEnum {
    ACTIVE 
    INACTIVE
    SUSPENDED
}

`