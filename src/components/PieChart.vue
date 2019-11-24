<script>
import {Pie, mixins} from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

const {reactiveProp} = mixins;

export default {
  name: "PieChart",
  extends: Pie,
  mixins: [reactiveProp],
  components: {
    ChartDataLabels,
  },
  props: ["options"],
  mounted(){
    this.renderChart(this.chartData, this.options);
  },
};
</script>
