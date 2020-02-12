import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.scrollRefresh, 100);
    this.itemImageListener = () => {
      newRefresh();
    }
    this.$bus.$on('loadImage', this.itemImageListener);
  },
  methods: {
    scrollRefresh() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }
  },
  deactivated() {
    this.$bus.$off('loadImage', this.itemImageListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBack: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo();
    },
  }
}
