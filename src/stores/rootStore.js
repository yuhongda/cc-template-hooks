import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import PetitionListStore from "./pages/petitionListStore";
import PetitionDetailStore from "./pages/petitionDetailStore";
import PostStore from "./pages/postStore";
import MeStore from "./pages/meStore";

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {

  }),

  petitionList: types.optional(PetitionListStore, {}),
  petitionDetail: types.optional(PetitionDetailStore, {}),
  post: types.optional(PostStore, {}),
  me: types.optional(MeStore, {}),
});

export default RootStore;
