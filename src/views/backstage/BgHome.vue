<template>
  <!-- 上半部分 -->
  <div class="home-up">
    <!-- 本周访客 -->
    <el-card>
      <h4 slot="header">本周访客</h4>
      <div id="visitor"></div>
    </el-card>
    <!-- 发帖数量 -->
    <el-card>
      <h4 slot="header">帖子数量</h4>
      <div id="amount"></div>
    </el-card>
    <!-- 新增用户 -->
    <el-card>
      <h4 slot="header">新增用户</h4>
      <div id="newUser"></div>
    </el-card>
    <!-- 板块访问量 -->
    <el-card>
      <h4 slot="header">板块访问量</h4>
      <div id="plate-visits"></div>
    </el-card>
  </div>
</template>

<script>
import { getAllData } from '@/api/services/backstage.services';
export default {
  data() {
    return {
      visitor: '',
      amount: '',
      newUser: '',
      plateVisits: '',
    };
  },
  methods: {
    // 柱状图
    drawColChart() {
      this.visitor = this.$echarts.init(document.getElementById('visitor'));
      this.visitor.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [],
            label: {
              show: true,
              position: 'top',
              color: '#333',
              fontSize: '12px',
              formatter: (params) => {
                return params.value[params.encode.x[0]];
              },
            },
          },
        ],
      });
    },
    // 饼状图
    drawPieChart() {
      // 发帖数量
      this.amount = this.$echarts.init(document.getElementById('amount'));
      this.amount.setOption({
        // 具体点击某一项触发的样式内容
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        // 左上侧分类条形符
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [],
        },
        // 饼状图类型以及数据源
        series: [
          {
            name: '统计数量',
            type: 'pie',
            data: [],
            // 设置饼状图扇形区域的样式
            emphasis: {
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          },
        ],
      });
    },
    // 曲线图
    drawLineChart() {
      this.newUser = this.$echarts.init(document.getElementById('newUser'));
      this.newUser.setOption({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            name: '新增用户',
            type: 'line',
            data: [],
            smooth: true,
          },
        ],
      });
    },
    // 玫瑰图
    drawRoseChart() {
      this.plateVisits = this.$echarts.init(
        document.getElementById('plate-visits'),
      );
      this.plateVisits.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          type: 'scroll',
          data: [],
        },
        series: [
          {
            name: '访问量',
            type: 'pie',
            data: [],
            roseType: 'radius',
            selecteMode: 'nultiple',
            selectedOffset: 20,
          },
        ],
        // 设置饼状图扇形区域的样式
        emphasis: {
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      });
    },
    // 动态获取饼状图数据
    async initPieData() {
      const data = await getAllData();
      console.log(data, 1);
      if (data.status === 200) {
        this.$message.success('获取数据成功！');
      }
      if (!data.data) return this.$message.error('服务器错误！');
      // 柱状图数据
      const {
        fri: vFri,
        mon: vMon,
        sat: vSat,
        sun: vSun,
        thu: vThu,
        tue: vTue,
        wed: vWed,
      } = data.data.viewsOfTheWeek;
      this.visitor.setOption({
        series: {
          data: [vMon, vTue, vWed, vThu, vFri, vSat, vSun],
        },
      });
      console.log([vMon, vTue, vWed, vThu, vFri, vSat, vSun]);

      // 饼状图数据
      const { creation, hero, natural } = data.data.pageView;
      this.amount.setOption({
        legend: {
          data: [
            {
              value: 1,
              name: '创世神话',
            },
            {
              value: 1,
              name: '英雄神话',
            },
            {
              value: 1,
              name: '自然神话',
            },
          ],
        },
        series: {
          data: [
            {
              value: creation,
              name: '创世神话',
            },
            {
              value: hero,
              name: '英雄神话',
            },
            {
              value: natural,
              name: '自然神话',
            },
          ],
        },
      });

      // 曲线图数据
      const {
        fri: uFri,
        mon: uMon,
        sat: uSat,
        sun: uSun,
        thu: uThu,
        tue: uTue,
        wed: uWed,
      } = data.data.userRegistrations;
      this.newUser.setOption({
        series: {
          data: [uMon, uTue, uWed, uThu, uFri, uSat, uSun],
        },
      });

      // 玫瑰图数据
      const {
        creation: pCreation,
        hero: pHero,
        natural: pNatural,
      } = data.data.postNum;
      this.plateVisits.setOption({
        legend: {
          data: [
            {
              value: 1,
              name: '创世神话',
            },
            {
              value: 1,
              name: '英雄神话',
            },
            {
              value: 1,
              name: '自然神话',
            },
          ],
        },
        series: {
          data: [
            {
              value: pCreation,
              name: '创世神话',
            },
            {
              value: pHero,
              name: '英雄神话',
            },
            {
              value: pNatural,
              name: '自然神话',
            },
          ],
        },
      });
    },
    drawCharts() {
      // 绘画柱状图
      this.drawColChart();
      // 绘画饼状图
      this.drawPieChart();
      // 绘画曲线图
      this.drawLineChart();
      // 绘画玫瑰图
      this.drawRoseChart();
    },
  },
  mounted() {
    this.drawCharts();
  },
  created() {
    this.initPieData();
  },
};
</script>

<style lang="less" scoped>
.home-up {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  .el-card {
    width: 48%;
    min-width: 400px;
    margin-bottom: 10px;
    h4 {
      margin: 0;
    }
  }
}
#amount,
#visitor,
#newUser,
#plate-visits {
  height: 200px;
}
</style>
