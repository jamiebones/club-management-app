
export enum Role {
    SALES = "SALES",
    PRESIDENT = "PRESIDENT",
    BARSECRETARY = "BARSECRETARY", 
    TREASURER = "TREASURER", 
    SECRETARY = "SECRETARY", 
    ADMIN     = "ADMIN"
  }

  declare module "next-auth" {
    interface User {
      role?: Role;
      bioDataId: string;
      id: string 
    }
  
    interface Session extends DefaultSession {
      user?: User;
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
      role?: Role;
      bioDataId: string;
      id: string 
    }
  }