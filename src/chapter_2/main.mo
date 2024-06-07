import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor chapter2{
  type Member = {
    name : Text;
    age : Nat;
  };
  type Result<A,B> = Result.Result<A,B>;
  type HashMap<K,V> = HashMap.HashMap<K,V>;
  let members = HashMap.HashMap<Principal, Member>(1, Principal.equal, Principal.hash);
  /// function to add new member and give error if already exists
  public shared ({caller}) func addMember(member: Member) : async Result<(), Text>{
    switch(members.get(caller)){
      case (null) {
        members.put(caller, member);
        return #ok();
      };
      case (? memberold) {
        return #err("Member already exists");
      };
    };
  };

    /// function to get member details
    public query func getMember(principal : Principal) : async Result<Member, Text>{
      switch(members.get(principal)){
        case (null){
          return #err("Member not found");
        };
        case (? member){
          return #ok(member);
        }
      }
    };

    /// function to update a member
    public shared ({caller}) func updateMember(member: Member) : async Result <(), Text>{
      switch(members.get(caller)){
        case (null){
          return #err("Member not found");
        };
        case (? memberOld){
          members.put(caller, member);
          return #ok();
        };
      };
      };
      /// function to get all members
      public query func getAllMembers() : async [Member]{
        Iter.toArray(members.vals());
      };
      /// function to return the no. of members
      public query func getNoMembers() : async Nat{
        members.size();
      };
      /// function to remove a member
      public shared ({caller}) func removeMember() : async Result<(), Text>{
        switch(members.get(caller)){
          case (null){
            #err("Member not found");
          };
          case (? member){
            members.delete(caller);
            #ok();
          };
        };
      };
};