import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
actor hello {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};

actor chapter1{
  let name : Text = "Harshed's DAO";
  var manifesto : Text = "Invite Trust, Build Trust, Earn Trust";
  var goal : Buffer.Buffer<Text> = Buffer.Buffer<Text>(10);
  public query func getName() :async Text{
    name;
  };
  public query func getManifesto() :async Text{
    manifesto;
  };
  public func setManifesto(newManifesto : Text): async (){
    manifesto := newManifesto;
  };
  public func addGoal(newGoal : Text): async (){
    goal.add(newGoal);
  };
  public query func getGoals() : async [Text]{
    Buffer.toArray(goal);
  };

  };