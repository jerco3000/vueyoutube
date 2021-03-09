<template>
  <div id="app">
    <Header />
    <SearchForm v-on:search="search" />
    <SearchResults
      v-if="videos.length > 0"
      v-bind:videos="videos"
      v-bind:reformattedSearchString="reformattedSearchString"
    />
    <Pagination
      v-if="videos.length > 0"
      v-bind:prevPageToken="api.prevPageToken"
      v-bind:nextPageToken="api.nextPageToken"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage"
    />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import Pagination from "./components/Pagination";
import axios from "axios";

export default {
  name: "app",
  components: {
    Header,
    SearchForm,
    SearchResults,
    Pagination,
  },
  data() {
    return {
      videos: [],
      reformattedSearchString: "",
      api: {
        q: "",
        prevPageToken: "",
        nextPageToken: "",
      },
    };
  },
  methods: {
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(" ");
      this.api.q = searchParams.join("+");
      this.getData("search", this.api.q, "");
    },

    prevPage() {
      this.getData("previous", this.api.q, this.api.prevPageToken);
    },

    nextPage() {
      this.getData("next", this.api.q, this.api.nextPageToken);
    },

    getData(apiUrl, searchTerm, pageToken) {
      axios
        .post(apiUrl, { searchstring: searchTerm, token: pageToken })
        .then((res) => {
          this.videos = res.data.videos;
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
