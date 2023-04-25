<template>
  <el-container>
    <MyHeader>Header</MyHeader>
    <el-main id="label"></el-main>
  </el-container>
</template>

<script>
import MyHeader from '../components/MyHeader.vue';
import { getRelationData } from '@/api/services/relation';

export default {
  data() {
    return {
      chartData: {
        nodes: [],
        links: [],
      },
      label: '',
      prevIndex: '',
      oldPrevIndex: '',
      notification: '',
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    highlight(index, myChart) {
      console.log(index, myChart);
      myChart.dispatchAction({
        type: 'highlight',
        dataIndex: index,
      });
    },

    // 非选中项取消高亮
    noneHighlight(index, myChart) {
      if (!index) return;
      myChart.dispatchAction({
        type: 'downplay',
        dataIndex: index,
      });
    },

    // 关系图
    drawLabelChart() {
      this.label = this.$echarts.init(document.getElementById('label'));
      const that = this;

      // echarts图表的点击事件，可通过param参数确认点击的对象
      this.label.on('click', function (param) {
        // that.label.dispatchAction({
        //   type: 'focusNodeAdjacency',
        //   // 使用 dataIndex 来定位节点。
        //   dataIndex: param.dataIndex,
        // });

        const { properties, dataIndex, nodeType } = param;
        that.noneHighlight(that.oldPrevIndex, this);
        that.oldPrevIndex = dataIndex;

        that.prevIndex = dataIndex;
        console.log(dataIndex);
        that.highlight(dataIndex, this);

        console.log(param.dataType);
        if (that.notification) {
          that.notification.close();
        }
        if (param.dataType == 'node') {
          // console.log(this);
          that.notification = that.$notify({
            title: param.data.name,
            message: param.data.text,
            type: 'success',
            duration: 0,
            position: 'bottom-right',
            // showClose: false,
          });
          console.log('点击了边', param);
        } else {
          console.log(param.dataType);
        }
      });

      this.label.on('mouseout', () => {
        if (that.prevIndex === '') return;
        // that.highlight(that.prevIndex, this);
      });

      // this.label.setOption({
      //   series: []
      // })
      // const option = {}

      // const nodes = [
      //   {
      //     name: '韦小宝',
      //     // id: '1',
      //     // symbolSize: 60, // 节点大小
      //     symbol: require('@/assets/relationBg.png'), // 节点形状，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'也可'image://url'设置节点图片
      //   },
      //   {
      //     name: '方怡',
      //     // id: '2',
      //     // symbolSize: 60,
      //   },
      //   {
      //     name: '双儿',
      //     // id: '3',
      //     // symbolSize: 60,
      //   },
      //   {
      //     name: '茅十八',
      //     // id: '4',
      //     // symbolSize: 60,
      //   },
      //   {
      //     name: '吴六奇',
      //     // id: '5',
      //     // symbolSize: 60,
      //   },
      // ];
      // // console.log(nodes);

      // const links = [
      //   {
      //     source: '韦小宝',
      //     target: '方怡',
      //     // relation: {
      //     name: '老婆',
      //     // id: '1',
      //     // },
      //   },
      //   {
      //     source: '韦小宝',
      //     target: '双儿',
      //     // relation: {
      //     name: '老婆',
      //     // id: '1',
      //     // },
      //   },
      //   {
      //     source: '韦小宝',
      //     target: '茅十八',
      //     // relation: {
      //     name: '兄弟',
      //     // id: '1',
      //     // },
      //   },
      //   {
      //     source: '茅十八',
      //     target: '韦小宝',
      //     // relation: {
      //     name: '兄弟',
      //     id: '1',
      //     // },
      //   },
      //   {
      //     source: '双儿',
      //     target: '吴六奇',
      //     // relation: {
      //     name: '义妹',
      //     // id: '1',
      //     // },
      //   },
      // ];

      this.label.setOption({
        // 设置高亮颜色
        dataRange: {
          show: false,
          x: 'left',
          y: 'bottom',
          splitList: [
            { start: 5, end: 5, color: '#007aff' }, //当值为5时，区域背景
          ],
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            links: this.chartData.links,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              // color: 'red', //设置线条颜色 8ab7bd
            },
            symbolSize: 80,
            roam: true, // 鼠标缩放功能
            focusNodeAdjacency: true, // 鼠标移到节点上时突出显示结点以及邻节点和边
            seriesType: 'effectScatter',
            // effectType: 'ripple', //特效类型，目前只支持涟漪特效'ripple'。
            // showEffectOn: 'emphasis',
            // rippleEffect: {
            //   color: 'rgba(235, 232, 29, 1)',
            //   number: 3,
            //   period: 4,
            //   scale: 10,
            //   brushType: 'fill',
            // },

            cursor: 'pointer',
            // rippleEffect: {
            //   //涟漪特效相关配置。
            //   period: 1.5, //动画的时间。
            //   scale: 6, //动画中波纹的最大缩放比例。
            //   brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'。
            // },
            // hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'red',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            dataZoom: {
              emphasis: {
                show: true,
                handleStyle: {
                  borderColor: '#ccc', //边框颜色
                  borderWidth: 20, //边框线宽
                },
              },
            },

            scaleLimit: {
              // 滚轮缩放的极限控制
              max: 3, // 滚轮缩放最大值
              min: 0.5, // 滚轮缩放的最小值
            },
            nodes: this.chartData.nodes,
            // itemStyle: {
            //   // color: {
            //   //   type: 'radial',
            //   //   x: 0.5,
            //   //   y: 0.5,
            //   //   r: 0.5,
            //   //   // colorStops: [
            //   //   //   {
            //   //   //     offset: 0,
            //   //   //     color: '#3dd67a' // 0% 处的颜色
            //   //   //   },
            //   //   //   {
            //   //   //     offset: 0.7,
            //   //   //     color: '#3dd67a' // 0% 处的颜色
            //   //   //   },
            //   //   //   {
            //   //   //     offset: 1,
            //   //   //     color: '#95dcb2' // 100% 处的颜色
            //   //   //   }
            //   //   // ],
            //   //   // global: false, // 缺省为 false
            //   // },
            // },
            label: {
              show: true,
              position: 'bottom',
              distance: 10,
              fontSize: 18,
              align: 'center',
            },
            autoCurveness: 0.01, // 多条边的时候，自动计算曲率
            edgeLabel: {
              // 边的设置
              show: true,
              position: 'middle',
              fontSize: 16,
              formatter: (params) => {
                return params.data.relation;
              },
            },
            edgeSymbol: ['circle', 'arrow'], // 边两边的类型
            force: {
              repulsion: 100,
              gravity: 0.01,
              edgeLength: 200,
            },
          },
        ],
      });
    },

    // 获取关系数据
    async getRelationData() {
      const res = await getRelationData();
      console.log(res);
      if (res.status === 200) {
        // if (res.data.newLink) {
        // this.handlerRelation(res.data.linksData);
        // const newObjOne = JSON.parse(
        //   JSON.stringify(res.data.newLink).replace(/name/g, 'source'),
        // );
        for (const i in res.data.linksData) {
          this.chartData.links.push({
            source: res.data.linksData[i].name,
            target: res.data.linksData[i].target,
            relation: res.data.linksData[i].relation,
          });
        }
        // this.links = newObjOne;
        // }
        // if (res.data.newNode) {
        for (const i in res.data.nodesData) {
          this.chartData.nodes.push({
            name: res.data.nodesData[i].name,
            symbol: 'image://' + res.data.nodesData[i].portrait,
            text: res.data.nodesData[i].text,
          });
        }
        // }
        console.log(this.chartData.nodes);
        return this.$message.success('获取数据成功！');
      }
      this.$message.error('获取数据失败！');
    },

    //改正数据
    // handlerRelation(data) {
    //   for (const i in data) {
    //     const newData = {
    //       name:data[i].topic
    //       tar
    //     }
    //   }
    // },

    // 动态获取关系图数据
    // async initLabelData () {
    // const data = await getLabelData()
    // if (!data) return
    // initLabelData () {
    //   const nodes = [
    //     {
    //       name: '韦小宝',
    //       id: '1',
    //       symbolSize: 60, // 节点大小
    //       symbol: 'circle' // 节点形状，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'也可'image://url'设置节点图片
    //     },
    //     {
    //       name: '方怡',
    //       id: '2',
    //       symbolSize: 60
    //     },
    //     {
    //       name: '双儿',
    //       id: '3',
    //       symbolSize: 60
    //     },
    //     {
    //       name: '茅十八',
    //       id: '4',
    //       symbolSize: 60
    //     },
    //     {
    //       name: '吴六奇',
    //       id: '5',
    //       symbolSize: 60
    //     }
    //   ]
    //   console.log(nodes)
    //   this.label.setOption({
    //     type: 'graph',
    //     layout: 'force',
    //     series: [{ nodes }]
    //   })
    // }

    // console.log(this.label)
    // alertClick() {
    //   console.log(1);
    // if (params.data.name) {
    //   var idCard = params.data.name; // 获取被点击节点的身份证号
    //   console.log(idCard);
    // } else {
    //   console.log('您点击节点信息！');
    // }
    // },
  },
  mounted() {},
  watch: {
    chartData: {
      deep: true,
      handler(newV, oldV) {
        this.drawLabelChart();
      },
    },
  },
  created() {
    this.getRelationData();
  },
  beforeDestroy() {
    if (this.notification) {
      this.notification.close();
    }
    console.log('bai');
  },
};
</script>

<style lang="less" scoped>
.el-container {
  display: flex;
  // position: relative;
  flex-direction: column;
  height: 100vh;
  // background: url('@/assets/relationBg.png') no-repeat;
  // background-size: cover;
  // &::before {
  //   content: '';
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.4);
  // }
  // .el-header {
  //   z-index: 2;
  // }
  #label {
    flex: 1;
    // height: 85vh;
    // padding: 0px;
    color: wheat;
    background: url('../assets/bgImg.png') no-repeat;
    background-color: rgba(0, 0, 0, 0.4);
    background-size: 100%;
  }
}
</style>
