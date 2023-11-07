/*
 * @author: zzp
 * @date: 2023-11-07 08:39:21
 * @fileName: circuit1.vue
 * @filePath: src/views/DistributionMonitoring/svg/circuit1.vue
 * @description: 电路图1
 */
<template>
  <svg-pan-zoom :fit="true" :center="true" class="svgPanZoom" id="svgPanZoom">
    <template #default>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080">
        <defs>
          <clipPath>
            <rect width="1920" height="1080" />
          </clipPath>
        </defs>
        <g id="首页_微站详情_JK01_B直流屏_1" data-name="首页 – 微站详情 – JK01 B直流屏 – 1" clip-path="url(#clip-首页_微站详情_JK01_B直流屏_1)">
          <g id="组_6603" data-name="组 6603" transform="translate(-63 -45)">
            <g id="_1-2" data-name="1">
              <path id="直线_749" data-name="直线 749" d="M289,.5H0v-1H289Z" transform="translate(289.5 146.5)" fill="#4ff643"/>
              <path id="直线_750" data-name="直线 750" d="M14,.5H0v-1H14Z" transform="translate(578.5 146.5)" fill="#40fcfe"/>
              <rect id="矩形_1956" data-name="矩形 1956" width="8" height="7" transform="translate(592 143)" fill="#40fcfe"/>
              <path id="路径_22488" data-name="路径 22488" d="M.1,37.491-.1,36.509a26.976,26.976,0,0,0,8.376-3.52c5.487-3.542,8.269-8.459,8.269-14.614S13.76,7.332,8.259,3.872A26.5,26.5,0,0,0-.089.492L.089-.492a27.081,27.081,0,0,1,8.7,3.518A19.443,19.443,0,0,1,14.8,8.774a17.2,17.2,0,0,1,2.746,9.6,17.393,17.393,0,0,1-2.745,9.638A19.858,19.858,0,0,1,8.8,33.847,27.472,27.472,0,0,1,.1,37.491Z" transform="translate(592.5 128.5)" fill="#40fcfe"/>
              <path id="直线_751" data-name="直线 751" d="M4,.5H0v-1H4Z" transform="translate(609.5 146.5)" fill="#40fcfe"/>
              <path id="直线_754" data-name="直线 754" d="M.5,37h-1V0h1Z" transform="translate(736.5 616.5)" fill="#40fcfe"/>
              <path id="直线_755" data-name="直线 755" d="M.5,50h-1V0h1Z" transform="translate(443.5 146.5)" fill="#4ff643"/>
              <path id="直线_756" data-name="直线 756" d="M.5,8h-1V0h1Z" transform="translate(443.5 196.5)" fill="#40fcfe"/>
              <path id="直线_757" data-name="直线 757" d="M11,11.707-.707,0,0-.707,11.707,11Z" transform="translate(437.5 198.5)" fill="#40fcfe"/>
              <path id="直线_758" data-name="直线 758" d="M0,11.707-.707,11,11-.707,11.707,0Z" transform="translate(438.5 198.5)" fill="#40fcfe"/>
              
              <path v-if="switchs.leftTop1" @click.stop="switchClick('leftTop1', true)" class="cursor" :stroke="`${circuit.key === 'leftTop1' ? '#FF9800' : ''}`" id="直线_759" data-name="直线 759" d="M24.546,54.21l-25-54L.454-.21l25,54Z" transform="translate(418.5 205.5)" fill="#40fcfe"/>
              <path v-else @click.stop="switchClick('leftTop1', false)" class="cursor" :stroke="`${circuit.key === 'leftTop1' ? '#FF9800' : ''}`" id="直线_759" data-name="直线 759" d="M.5,55h-1V0h1Z" transform="translate(443.5 204.5)" fill="#fe4040"/>
              
              <path id="直线_760" data-name="直线 760" d="M.5,8.5h-1v-9h1Z" transform="translate(443.5 259.5)" fill="#40fcfe"/>
              <path id="直线_761" data-name="直线 761" d="M.5,74h-1V0h1Z" transform="translate(443.5 267.5)" fill="#4ff643"/>
              <path id="直线_762" data-name="直线 762" d="M.5,9h-1V0h1Z" transform="translate(443.5 341.5)" fill="#40fcfe"/>
              <path id="直线_763" data-name="直线 763" d="M10.5.5H-.5v-1h11Z" transform="translate(438.5 350.5)" fill="#40fcfe"/>
              
              <path v-if="switchs.leftTop2" @click.stop="switchClick('leftTop2', true)" class="cursor" :stroke="`${circuit.key === 'leftTop2' ? '#FF9800' : ''}`" id="直线_764" data-name="直线 764" d="M24.548,53.213l-25-53,.9-.427,25,53Z" transform="translate(418.5 352.5)" fill="#40fcfe"/>
              <path v-else @click.stop="switchClick('leftTop2', false)" class="cursor" :stroke="`${circuit.key === 'leftTop2' ? '#FF9800' : ''}`" id="直线_764" data-name="直线 764" d="M.5,55h-1V0h1Z" transform="translate(443.5 350.5)" fill="#fe4040"/>
              
              <path id="直线_765" data-name="直线 765" d="M.5,11h-1V0h1Z" transform="translate(443.5 404.5)" fill="#40fcfe"/>
              <path id="直线_766" data-name="直线 766" d="M.5,110h-1V0h1Z" transform="translate(443.5 415.5)" fill="#4ff643"/>
              <path id="直线_787" data-name="直线 787" d="M.5,38h-1V0h1Z" transform="translate(443.5 560.5)" fill="#4ff643"/>
              <path id="直线_795" data-name="直线 795" d="M.5,305h-1V0h1Z" transform="translate(443.5 670.5)" fill="#4ff643"/>
              <path id="直线_767" data-name="直线 767" d="M97,.5H0v-1H97Z" transform="translate(346.5 488.5)" fill="#4ff643"/>
              <path id="直线_768" data-name="直线 768" d="M.5,18.5h-1V-.5h1Z" transform="translate(346.5 488.5)" fill="#4ff643"/>
              <path id="直线_769" data-name="直线 769" d="M.5,17.5h-1V-.5h1Z" transform="translate(346.5 507.5)" fill="#40fcfe"/>
              <path id="直线_772" data-name="直线 772" d="M.5,29.5h-1V-.5h1Z" transform="translate(346.5 543.5)" fill="#40fcfe"/>
              <path id="直线_770" data-name="直线 770" d="M36.5.5H-.5v-1h37Z" transform="translate(328.5 524.5)" fill="#40fcfe"/>
              <path id="直线_771" data-name="直线 771" d="M36.5.5H-.5v-1h37Z" transform="translate(328.5 543.5)" fill="#40fcfe"/>
              <g id="组_6593" data-name="组 6593">
                <path id="椭圆_296" data-name="椭圆 296" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(330 573)" fill="#40fcfe"/>
                <path id="直线_773" data-name="直线 773" d="M21.646,22.354l-22-22L.354-.354l22,22Z" transform="translate(335.5 578.5)" fill="#40fcfe"/>
                <path id="直线_774" data-name="直线 774" d="M.354,23.354l-.707-.707,23-23,.707.707Z" transform="translate(334.5 577.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_775" data-name="直线 775" d="M.5,11h-1V0h1Z" transform="translate(346.5 605.5)" fill="#40fcfe"/>
              <path id="直线_776" data-name="直线 776" d="M.5,18h-1V0h1Z" transform="translate(346.5 616.5)" fill="#4ff643"/>
              <path id="直线_777" data-name="直线 777" d="M.5,12h-1V0h1Z" transform="translate(346.5 634.5)" fill="#40fcfe"/>
              <path id="直线_778" data-name="直线 778" d="M38.5.5H-.5v-1h39Z" transform="translate(327.5 646.5)" fill="#40fcfe"/>
              <path id="直线_779" data-name="直线 779" d="M24.5.5H-.5v-1h25Z" transform="translate(334.5 652.5)" fill="#40fcfe"/>
              <path id="直线_780" data-name="直线 780" d="M12.5.5H-.5v-1h13Z" transform="translate(340.5 659.5)" fill="#40fcfe"/>
              <path id="直线_781" data-name="直线 781" d="M.5,3.5h-1v-4h1Z" transform="translate(443.5 525.5)" fill="#40fcfe"/>
              <path id="直线_786" data-name="直线 786" d="M.5,17.5h-1V-.5h1Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              <g id="组_6588" data-name="组 6588">
                <path id="直线_782" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6583" data-name="组 6583">
                <path id="椭圆_297" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788" data-name="直线 788" d="M.5,85h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6585" data-name="组 6585" transform="translate(98)">
                <path id="椭圆_297-2" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298-2" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788-2" data-name="直线 788" d="M.5,85h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789-2" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793-2" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790-2" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792-2" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791-2" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794-2" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6584" data-name="组 6584" transform="translate(49)">
                <path id="椭圆_297-3" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298-3" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788-3" data-name="直线 788" d="M.5,72h-1V0h1Z" transform="translate(394.5 598.5)" fill="#40fcfe"/>
                <path id="直线_789-3" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793-3" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790-3" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792-3" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791-3" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794-3" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6586" data-name="组 6586" transform="translate(49 132)">
                <path id="椭圆_298-4" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_793-4" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_792-4" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_794-4" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6587" data-name="组 6587" transform="translate(19 191)">
                <path id="椭圆_298-5" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
              </g>
              <path id="多边形_61" data-name="多边形 61" d="M16,2.292,1.6,32H30.4L16,2.292M16,0,32,33H0Z" transform="translate(428 888)" fill="#4ff643"/>
              <path id="直线_796" data-name="直线 796" d="M.5,48.5h-1V-.5h1Z" transform="translate(413.5 819.5)" fill="#40fcfe"/>
              <rect id="矩形_1957" data-name="矩形 1957" width="33" height="9" transform="translate(397 839)" fill="#40fcfe"/>
              <path id="直线_797" data-name="直线 797" d="M12.18,7.684-.684.18l.5-.864,12.864,7.5Z" transform="translate(428.5 842.5)" fill="#40fcfe"/>
              <path id="直线_798" data-name="直线 798" d="M.5,10h-1V0h1Z" transform="translate(440.5 839.5)" fill="#40fcfe"/>
              <path id="直线_799" data-name="直线 799" d="M9.316,3.632-.632.316l.316-.949L9.632,2.684Z" transform="translate(440.5 839.5)" fill="#40fcfe"/>
              <path id="多边形_62" data-name="多边形 62" d="M4,3.162,1.387,11H6.613L4,3.162M4,0,8,12H0Z" transform="translate(461.902 843.633) rotate(111)" fill="#40fcfe"/>
              <g id="组_6589" data-name="组 6589" transform="translate(98 219)">
                <path id="直线_782-2" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785-2" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783-2" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784-2" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_800" data-name="直线 800" d="M.5,4h-1V0h1Z" transform="translate(541.5 743.5)" fill="#40fcfe"/>
              <path id="直线_801" data-name="直线 801" d="M.5,19h-1V0h1Z" transform="translate(541.5 762.5)" fill="#40fcfe"/>
              <path id="直线_802" data-name="直线 802" d="M98,.5H0v-1H98Z" transform="translate(443.5 732.5)" fill="#4ff643"/>
              <path id="直线_803" data-name="直线 803" d="M.5,11.5h-1V-.5h1Z" transform="translate(541.5 732.5)" fill="#4ff643"/>
              <path id="直线_804" data-name="直线 804" d="M.5,24h-1V0h1Z" transform="translate(541.5 781.5)" fill="#4ff643"/>
              <path id="直线_805" data-name="直线 805" d="M.5,17h-1V0h1Z" transform="translate(541.5 805.5)" fill="#40fcfe"/>
              <path id="矩形_1958" data-name="矩形 1958" d="M1,1V46H23V1H1M0,0H24V47H0Z" transform="translate(529 818)" fill="#40fcfe"/>
              <path id="减去_102" data-name="减去 102" d="M-7596.5-4068v0l-7.5-28h15l-7.5,28Zm-.5-7v1h1v-1Zm0-3v1h1v-1Zm-1-1v1h1v-1Zm2-1v1h1v-1Zm-1-1v1h1v-1Zm2-1h-1v1h1Zm-4-1v1h1v-1Zm2-1h-1v1h1Zm1-1v1h1v-1Zm-1-1v1h1v-1Zm-3,0v1h1v-1Zm5-1v1h1v-1Zm-4-1v1h1v-1Zm4-1v1h1v-1Zm-2,0v1h1v-1h-1Zm0-1h-1v1h1v-1Zm-3.99,0v1h1v-1Zm4.99,1h1v-1h-1Zm2-2v1h1v-1Zm-3,0v1h1v-1Zm0-1h-1v1h1Zm-3,0v1h1v-1Zm8,0h-1v1h1Zm-4-1v1h1v-1h-1Zm-5,0v1h1v-1h-1Zm4-1v1h1v-1Zm-5,0v1h1v-1Zm7,0v1h1v-1Zm-5,0v1h1v-1Zm7-1v1h1v-1Zm-2,0h-1v1h1Zm-5,0h-1v1h1Z" transform="translate(8138 4919)" fill="#40fcfe"/>
              <path id="直线_806" data-name="直线 806" d="M.5,14h-1V0h1Z" transform="translate(541.5 864.5)" fill="#40fcfe"/>
              <path id="直线_807" data-name="直线 807" d="M.5,49h-1V0h1Z" transform="translate(541.5 878.5)" fill="#4ff643"/>
              <path id="直线_808" data-name="直线 808" d="M.5,12h-1V0h1Z" transform="translate(541.5 930.5)" fill="#40fcfe"/>
              <path id="直线_809" data-name="直线 809" d="M51.5.5H-.5v-1h52Z" transform="translate(515.5 942.5)" fill="#40fcfe"/>
              <path id="直线_810" data-name="直线 810" d="M34.5.5H-.5v-1h35Z" transform="translate(523.5 951.5)" fill="#40fcfe"/>
              <path id="直线_811" data-name="直线 811" d="M17.5.5H-.5v-1h18Z" transform="translate(532.5 960.5)" fill="#40fcfe"/>
            </g>
            <g id="_2" data-name="2">
              <path id="直线_752" data-name="直线 752" d="M123,.5H0v-1H123Z" transform="translate(613.5 146.5)" fill="#4ff643"/>
              <path id="直线_753" data-name="直线 753" d="M.5,470.5h-1V-.5h1Z" transform="translate(736.5 146.5)" fill="#4ff643"/>
              <g id="组_6591" data-name="组 6591" transform="translate(293 18)">
                <path id="椭圆_297-4" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="直线_788-4" data-name="直线 788" d="M.5,48h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789-4" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_790-4" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_791-4" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6592" data-name="组 6592" transform="translate(390 18)">
                <path id="椭圆_297-5" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="直线_788-5" data-name="直线 788" d="M.5,48h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789-5" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_790-5" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_791-5" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_812" data-name="直线 812" d="M.5,37h-1V0h1Z" transform="translate(736.5 616.5)" fill="#40fcfe"/>
              <path id="直线_813" data-name="直线 813" d="M.5,152h-1V0h1Z" transform="translate(736.5 653.5)" fill="#4ff643"/>
              <path id="矩形_1991" data-name="矩形 1991" d="M1,1V55H24V1H1M0,0H25V56H0Z" transform="translate(724 814)" fill="#40fcfe"/>
              <path id="直线_814" data-name="直线 814" d="M.5,72h-1V0h1Z" transform="translate(736.5 805.5)" fill="#40fcfe"/>
              <path id="直线_815" data-name="直线 815" d="M.5,2h-1V0h1Z" transform="translate(736.5 877.5)" fill="#4ff643"/>
              <path id="椭圆_299" data-name="椭圆 299" d="M27,1A26.007,26.007,0,0,0,16.88,50.957,26.007,26.007,0,0,0,37.12,3.043,25.836,25.836,0,0,0,27,1m0-1A27,27,0,1,1,0,27,27,27,0,0,1,27,0Z" transform="translate(710 879)" fill="#40fcfe"/>
              <path id="椭圆_300" data-name="椭圆 300" d="M27,1A26.007,26.007,0,0,0,16.88,50.957,26.007,26.007,0,0,0,37.12,3.043,25.836,25.836,0,0,0,27,1m0-1A27,27,0,1,1,0,27,27,27,0,0,1,27,0Z" transform="translate(710 915)" fill="#40fcfe"/>
              <text id="V" transform="translate(729 909)" fill="#40fcfe" font-size="30" font-family="NSimSun"><tspan x="0" y="0">V</tspan></text>
              <text id="V-2" data-name="V" transform="translate(729 957)" fill="#40fcfe" font-size="30" font-family="NSimSun"><tspan x="0" y="0">V</tspan></text>
              <path id="直线_816" data-name="直线 816" d="M195,.5H0v-1H195Z" transform="translate(736.5 732.5)" fill="#4ff643"/>
              <path id="直线_817" data-name="直线 817" d="M.5,609.5h-1V-.5h1Z" transform="translate(931.5 146.5)" fill="#4ff643"/>
              <path id="直线_818" data-name="直线 818" d="M.5,22.5h-1V-.5h1Z" transform="translate(931.5 757.5)" fill="#40fcfe"/>
              <path id="直线_821" data-name="直线 821" d="M.5,38.5h-1V-.5h1Z" transform="translate(931.5 806.5)" fill="#40fcfe"/>
              <path id="直线_819" data-name="直线 819" d="M48.5.5H-.5v-1h49Z" transform="translate(907.5 779.5)" fill="#40fcfe"/>
              <path id="直线_820" data-name="直线 820" d="M48.5.5H-.5v-1h49Z" transform="translate(907.5 806.5)" fill="#40fcfe"/>
              <g id="组_6594" data-name="组 6594" transform="translate(585.5 277.5)">
                <path id="椭圆_296-2" data-name="椭圆 296" d="M21.5,1a20.506,20.506,0,0,0-7.979,39.389A20.506,20.506,0,0,0,29.479,2.611,20.371,20.371,0,0,0,21.5,1m0-1A21.5,21.5,0,1,1,0,21.5,21.5,21.5,0,0,1,21.5,0Z" transform="translate(325 567)" fill="#40fcfe"/>
                <path id="直线_773-2" data-name="直线 773" d="M29.646,30.354l-30-30L.354-.354l30,30Z" transform="translate(331.5 574.5)" fill="#40fcfe"/>
                <path id="直线_774-2" data-name="直线 774" d="M.354,31.354l-.707-.707,31-31,.707.707Z" transform="translate(330.5 573.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_822" data-name="直线 822" d="M.5,15h-1V0h1Z" transform="translate(931.5 887.5)" fill="#40fcfe"/>
              <path id="直线_823" data-name="直线 823" d="M.5,24h-1V0h1Z" transform="translate(931.5 902.5)" fill="#4ff643"/>
              <path id="直线_824" data-name="直线 824" d="M.5,16h-1V0h1Z" transform="translate(931.5 926.5)" fill="#40fcfe"/>
              <path id="直线_825" data-name="直线 825" d="M51.5.5H-.5v-1h52Z" transform="translate(905.5 942.5)" fill="#40fcfe"/>
              <path id="直线_826" data-name="直线 826" d="M33.5.5H-.5v-1h34Z" transform="translate(914.5 951.5)" fill="#40fcfe"/>
              <path id="直线_827" data-name="直线 827" d="M16.5.5H-.5v-1h17Z" transform="translate(923.5 960.5)" fill="#40fcfe"/>
              <path id="直线_828" data-name="直线 828" d="M72.5.5H-.5v-1h73Z" transform="translate(931.5 146.5)" fill="#4ff643"/>
            </g>
            <g id="_3" data-name="3">
              <path id="直线_829" data-name="直线 829" d="M48,.5H0v-1H48Z" transform="translate(1005.5 146.5)" fill="#4ff643"/>
              <g id="组_6595" data-name="组 6595" transform="translate(2075.05 260) rotate(180)">
                <path id="直线_830" data-name="直线 830" d="M14,.5H0v-1H14Z" transform="translate(986.5 113.5)" fill="#40fcfe"/>
                <rect id="矩形_1992" data-name="矩形 1992" width="8" height="7" transform="translate(1000 110)" fill="#40fcfe"/>
                <path id="路径_22489" data-name="路径 22489" d="M.1,37.491-.1,36.509a26.976,26.976,0,0,0,8.376-3.52c5.487-3.542,8.269-8.459,8.269-14.614S13.76,7.332,8.259,3.872A26.5,26.5,0,0,0-.089.492L.089-.492a27.081,27.081,0,0,1,8.7,3.518A19.443,19.443,0,0,1,14.8,8.774a17.2,17.2,0,0,1,2.746,9.6,17.393,17.393,0,0,1-2.745,9.638A19.858,19.858,0,0,1,8.8,33.847,27.472,27.472,0,0,1,.1,37.491Z" transform="translate(1000.5 95.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6596" data-name="组 6596" transform="translate(373 33)">
                <path id="直线_830-2" data-name="直线 830" d="M14,.5H0v-1H14Z" transform="translate(986.5 113.5)" fill="#40fcfe"/>
                <rect id="矩形_1992-2" data-name="矩形 1992" width="8" height="7" transform="translate(1000 110)" fill="#40fcfe"/>
                <path id="路径_22489-2" data-name="路径 22489" d="M.1,37.491-.1,36.509a26.976,26.976,0,0,0,8.376-3.52c5.487-3.542,8.269-8.459,8.269-14.614S13.76,7.332,8.259,3.872A26.5,26.5,0,0,0-.089.492L.089-.492a27.081,27.081,0,0,1,8.7,3.518A19.443,19.443,0,0,1,14.8,8.774a17.2,17.2,0,0,1,2.746,9.6,17.393,17.393,0,0,1-2.745,9.638A19.858,19.858,0,0,1,8.8,33.847,27.472,27.472,0,0,1,.1,37.491Z" transform="translate(1000.5 95.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_831" data-name="直线 831" d="M3.5.5h-4v-1h4Z" transform="translate(1054.5 146.5)" fill="#40fcfe"/>
              <path id="直线_833" data-name="直线 833" d="M3.5.5h-4v-1h4Z" transform="translate(1390.55 146.5)" fill="#40fcfe"/>
              <path id="直线_832" data-name="直线 832" d="M267.5.5H-.5v-1h268Z" transform="translate(1090.5 146.5)" fill="#4ff643"/>
              <path id="直线_834" data-name="直线 834" d="M.5,50h-1V0h1Z" transform="translate(1224.5 146.5)" fill="#4ff643"/>
              <path id="直线_835" data-name="直线 835" d="M.5,4h-1V0h1Z" transform="translate(1224.5 196.5)" fill="#40fcfe"/>
              <path id="直线_836" data-name="直线 836" d="M13.5.5H-.5v-1h14Z" transform="translate(1217.5 200.5)" fill="#40fcfe"/>
              <path id="椭圆_301" data-name="椭圆 301" d="M5,1A4,4,0,1,0,9,5,4,4,0,0,0,5,1M5,0A5,5,0,1,1,0,5,5,5,0,0,1,5,0Z" transform="translate(1219 200)" fill="#40fcfe"/>
              <path id="直线_837" data-name="直线 837" d="M38,.5H0v-1H38Z" transform="translate(1150.5 232.5)" fill="#4ff643"/>
              <path id="直线_838" data-name="直线 838" d="M.5,17.5h-1V-.5h1Z" transform="translate(1150.5 232.5)" fill="#4ff643"/>
              <path id="直线_839" data-name="直线 839" d="M.5,12.5h-1V-.5h1Z" transform="translate(1150.5 250.5)" fill="#40fcfe"/>
              <path id="直线_840" data-name="直线 840" d="M38.5.5H-.5v-1h39Z" transform="translate(1131.5 262.5)" fill="#40fcfe"/>
              <path id="直线_841" data-name="直线 841" d="M24.5.5H-.5v-1h25Z" transform="translate(1138.5 268.5)" fill="#40fcfe"/>
              <path id="直线_842" data-name="直线 842" d="M12.5.5H-.5v-1h13Z" transform="translate(1144.5 275.5)" fill="#40fcfe"/>

              <path v-if="switchs.rightTop1" @click.stop="switchClick('rightTop1', true)" class="cursor" :stroke="`${circuit.key === 'rightTop1' ? '#FF9800' : ''}`" id="直线_843" data-name="直线 843" d="M25.549,54.217l-26-54,.9-.434,26,54Z" transform="translate(1198.5 205.5)" fill="#40fcfe"/>
              <path v-else @click.stop="switchClick('rightTop1', false)" class="cursor" :stroke="`${circuit.key === 'rightTop1' ? '#FF9800' : ''}`" id="直线_843" data-name="直线 843" d="M.5,54h-1V0h1Z" transform="translate(1224.5 205.5)" fill="#fe4040"/>
              
              <path id="直线_844" data-name="直线 844" d="M.5,9h-1V0h1Z" transform="translate(1224.5 259.5)" fill="#40fcfe"/>
              <path id="直线_845" data-name="直线 845" d="M.5,257h-1V0h1Z" transform="translate(1224.5 268.5)" fill="#4ff643"/>
              <path id="直线_860" data-name="直线 860" d="M.5,243h-1V0h1Z" transform="translate(1224.5 562.5)" fill="#4ff643"/>
              <path id="直线_846" data-name="直线 846" d="M98,.5H0v-1H98Z" transform="translate(1126.5 488.5)" fill="#4ff643"/>
              <path id="直线_847" data-name="直线 847" d="M.5,17.5h-1V-.5h1Z" transform="translate(1126.5 488.5)" fill="#4ff643"/>
              <path id="直线_848" data-name="直线 848" d="M.5,17.5h-1V-.5h1Z" transform="translate(1126.5 507.5)" fill="#40fcfe"/>
              <path id="直线_849" data-name="直线 849" d="M36.5.5H-.5v-1h37Z" transform="translate(1108.5 524.5)" fill="#40fcfe"/>
              <path id="直线_850" data-name="直线 850" d="M36.5.5H-.5v-1h37Z" transform="translate(1108.5 543.5)" fill="#40fcfe"/>
              <path id="直线_851" data-name="直线 851" d="M.5,29h-1V0h1Z" transform="translate(1126.5 543.5)" fill="#40fcfe"/>
              <g id="组_6597" data-name="组 6597" transform="translate(780 -1)">
                <path id="椭圆_296-3" data-name="椭圆 296" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(330 573)" fill="#40fcfe"/>
                <path id="直线_773-3" data-name="直线 773" d="M21.646,22.354l-22-22L.354-.354l22,22Z" transform="translate(335.5 578.5)" fill="#40fcfe"/>
                <path id="直线_774-3" data-name="直线 774" d="M.354,23.354l-.707-.707,23-23,.707.707Z" transform="translate(334.5 577.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_852" data-name="直线 852" d="M.5,12h-1V0h1Z" transform="translate(1126.5 604.5)" fill="#40fcfe"/>
              <path id="直线_853" data-name="直线 853" d="M.5,17h-1V0h1Z" transform="translate(1126.5 616.5)" fill="#4ff643"/>
              <path id="直线_854" data-name="直线 854" d="M.5,13h-1V0h1Z" transform="translate(1126.5 633.5)" fill="#40fcfe"/>
              <path id="直线_855" data-name="直线 855" d="M38.5.5H-.5v-1h39Z" transform="translate(1107.5 646.5)" fill="#40fcfe"/>
              <path id="直线_856" data-name="直线 856" d="M25.5.5H-.5v-1h26Z" transform="translate(1113.5 652.5)" fill="#40fcfe"/>
              <path id="直线_857" data-name="直线 857" d="M12.5.5H-.5v-1h13Z" transform="translate(1120.5 659.5)" fill="#40fcfe"/>
              <g id="组_6598" data-name="组 6598" transform="translate(781)">
                <path id="直线_782-3" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785-3" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783-3" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784-3" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_858" data-name="直线 858" d="M.5,4h-1V0h1Z" transform="translate(1224.5 524.5)" fill="#40fcfe"/>
              <path id="直线_859" data-name="直线 859" d="M.5,19h-1V0h1Z" transform="translate(1224.5 543.5)" fill="#40fcfe"/>
              <path id="矩形_1993" data-name="矩形 1993" d="M1,1V55H25V1H1M0,0H26V56H0Z" transform="translate(1211 814)" fill="#40fcfe"/>
              <path id="直线_861" data-name="直线 861" d="M.5,72h-1V0h1Z" transform="translate(1224.5 805.5)" fill="#40fcfe"/>
              <g id="组_6599" data-name="组 6599">
                <path id="椭圆_302" data-name="椭圆 302" d="M26,1a25.007,25.007,0,0,0-9.731,48.036A25.007,25.007,0,0,0,35.731,2.964,24.843,24.843,0,0,0,26,1m0-1A26,26,0,1,1,0,26,26,26,0,0,1,26,0Z" transform="translate(1198 879)" fill="#40fcfe"/>
                <path id="直线_862" data-name="直线 862" d="M8.646,9.354l-9-9L.354-.354l9,9Z" transform="translate(1215.5 896.5)" fill="#40fcfe"/>
                <path id="直线_863" data-name="直线 863" d="M.374,9.332l-.747-.664,8-9,.747.664Z" transform="translate(1224.5 896.5)" fill="#40fcfe"/>
                <path id="直线_864" data-name="直线 864" d="M.5,7.5h-1v-8h1Z" transform="translate(1224.5 905.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6600" data-name="组 6600" transform="translate(-18 35)">
                <path id="椭圆_302-2" data-name="椭圆 302" d="M26,1a25.007,25.007,0,0,0-9.731,48.036A25.007,25.007,0,0,0,35.731,2.964,24.843,24.843,0,0,0,26,1m0-1A26,26,0,1,1,0,26,26,26,0,0,1,26,0Z" transform="translate(1198 879)" fill="#40fcfe"/>
                <path id="直线_862-2" data-name="直线 862" d="M8.646,9.354l-9-9L.354-.354l9,9Z" transform="translate(1215.5 896.5)" fill="#40fcfe"/>
                <path id="直线_863-2" data-name="直线 863" d="M.374,9.332l-.747-.664,8-9,.747.664Z" transform="translate(1224.5 896.5)" fill="#40fcfe"/>
                <path id="直线_864-2" data-name="直线 864" d="M.5,7.5h-1v-8h1Z" transform="translate(1224.5 905.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6601" data-name="组 6601" transform="translate(18 35)">
                <path id="椭圆_302-3" data-name="椭圆 302" d="M26,1a25.007,25.007,0,0,0-9.731,48.036A25.007,25.007,0,0,0,35.731,2.964,24.843,24.843,0,0,0,26,1m0-1A26,26,0,1,1,0,26,26,26,0,0,1,26,0Z" transform="translate(1198 879)" fill="#40fcfe"/>
                <path id="直线_865" data-name="直线 865" d="M.028,1.5-.028.5l18-1,.055,1Z" transform="translate(1214.5 897.5)" fill="#40fcfe"/>
                <path id="直线_866" data-name="直线 866" d="M7.76,17.665-.665-.24l.9-.426,8.426,17.9Z" transform="translate(1214.5 898.5)" fill="#40fcfe"/>
                <path id="直线_867" data-name="直线 867" d="M.338,11.369l-.676-.737,12-11,.676.737Z" transform="translate(1222.5 904.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_868" data-name="直线 868" d="M70.5.5H-.5v-1h71Z" transform="translate(1153.5 904.5)" fill="#40fcfe"/>
              <path id="直线_869" data-name="直线 869" d="M.5,35h-1V0h1Z" transform="translate(1153.5 904.5)" fill="#40fcfe"/>
              <path id="矩形_1994" data-name="矩形 1994" d="M1,1V53H13V1H1M0,0H14V54H0Z" transform="translate(1147 939)" fill="#40fcfe"/>
              <path id="直线_870" data-name="直线 870" d="M.5,9h-1V0h1Z" transform="translate(1171.5 939.5)" fill="#40fcfe"/>
              <path id="直线_871" data-name="直线 871" d="M0,35.707-.707,35,35-.707,35.707,0Z" transform="translate(1136.5 948.5)" fill="#40fcfe"/>
              <path id="直线_872" data-name="直线 872" d="M.5,10h-1V0h1Z" transform="translate(1136.5 983.5)" fill="#40fcfe"/>
              <path id="直线_873" data-name="直线 873" d="M.5,38h-1V0h1Z" transform="translate(1153.5 992.5)" fill="#40fcfe"/>
              <path id="直线_874" data-name="直线 874" d="M36.5.5H-.5v-1h37Z" transform="translate(1135.5 1030.5)" fill="#40fcfe"/>
              <path id="直线_875" data-name="直线 875" d="M24.5.5H-.5v-1h25Z" transform="translate(1141.5 1036.5)" fill="#40fcfe"/>
              <path id="直线_876" data-name="直线 876" d="M12.5.5H-.5v-1h13Z" transform="translate(1147.5 1042.5)" fill="#40fcfe"/>
              <path id="直线_877" data-name="直线 877" d="M97,.5H0v-1H97Z" transform="translate(1224.5 732.5)" fill="#4ff643"/>
              <path id="直线_878" data-name="直线 878" d="M.5,11.5h-1V-.5h1Z" transform="translate(1321.5 732.5)" fill="#4ff643"/>
              <path id="直线_879" data-name="直线 879" d="M.5,3.5h-1v-4h1Z" transform="translate(1321.5 745.5)" fill="#40fcfe"/>
              <g id="组_6602" data-name="组 6602" transform="translate(878 219)">
                <path id="直线_782-4" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785-4" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783-4" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784-4" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_880" data-name="直线 880" d="M.5,18h-1V0h1Z" transform="translate(1321.5 762.5)" fill="#40fcfe"/>
              <path id="直线_881" data-name="直线 881" d="M.5,24h-1V0h1Z" transform="translate(1321.5 780.5)" fill="#4ff643"/>
              <path id="直线_882" data-name="直线 882" d="M.5,18.5h-1V-.5h1Z" transform="translate(1321.5 805.5)" fill="#40fcfe"/>
              <path id="矩形_1995" data-name="矩形 1995" d="M1,1V46H24V1H1M0,0H25V47H0Z" transform="translate(1309 818)" fill="#40fcfe"/>
              <path id="减去_103" data-name="减去 103" d="M-7596.5-4068v0l-7.5-28h15l-7.5,28Zm-.5-7v1h1v-1Zm0-3v1h1v-1Zm-1-1v1h1v-1Zm2-1v1h1v-1Zm-1-1v1h1v-1Zm2-1h-1v1h1Zm-4-1v1h1v-1Zm2-1h-1v1h1Zm1-1v1h1v-1Zm-1-1v1h1v-1Zm-3,0v1h1v-1Zm5-1v1h1v-1Zm-4-1v1h1v-1Zm4-1v1h1v-1Zm-2,0v1h1v-1h-1Zm0-1h-1v1h1v-1Zm-3.99,0v1h1v-1Zm4.99,1h1v-1h-1Zm2-2v1h1v-1Zm-3,0v1h1v-1Zm0-1h-1v1h1Zm-3,0v1h1v-1Zm8,0h-1v1h1Zm-4-1v1h1v-1h-1Zm-5,0v1h1v-1h-1Zm4-1v1h1v-1Zm-5,0v1h1v-1Zm7,0v1h1v-1Zm-5,0v1h1v-1Zm7-1v1h1v-1Zm-2,0h-1v1h1Zm-5,0h-1v1h1Z" transform="translate(8918 4919)" fill="#40fcfe"/>
              <path id="直线_883" data-name="直线 883" d="M.5,14h-1V0h1Z" transform="translate(1321.5 864.5)" fill="#40fcfe"/>
              <path id="直线_884" data-name="直线 884" d="M.5,49h-1V0h1Z" transform="translate(1321.5 878.5)" fill="#4ff643"/>
              <path id="直线_885" data-name="直线 885" d="M.5,12h-1V0h1Z" transform="translate(1321.5 930.5)" fill="#40fcfe"/>
              <path id="直线_886" data-name="直线 886" d="M51.5.5H-.5v-1h52Z" transform="translate(1295.5 942.5)" fill="#40fcfe"/>
              <path id="直线_887" data-name="直线 887" d="M34.5.5H-.5v-1h35Z" transform="translate(1303.5 951.5)" fill="#40fcfe"/>
              <path id="直线_888" data-name="直线 888" d="M17.5.5H-.5v-1h18Z" transform="translate(1312.5 960.5)" fill="#40fcfe"/>
            </g>
            <g id="_1-3" data-name="1" transform="translate(1171)">
              <path id="直线_749-2" data-name="直线 749" d="M296,.5H0v-1H296Z" transform="translate(289.5 146.5)" fill="#4ff643"/>
              <path id="直线_750-2" data-name="直线 750" d="M14,.5H0v-1H14Z" transform="translate(308.5 146.5) rotate(180)" fill="#40fcfe"/>
              <rect id="矩形_1956-2" data-name="矩形 1956" width="8" height="7" transform="translate(295 150) rotate(180)" fill="#40fcfe"/>
              <path id="路径_22488-2" data-name="路径 22488" d="M.1,37.491-.1,36.509a26.976,26.976,0,0,0,8.376-3.52c5.487-3.542,8.269-8.459,8.269-14.614S13.76,7.332,8.259,3.872A26.5,26.5,0,0,0-.089.492L.089-.492a27.081,27.081,0,0,1,8.7,3.518A19.443,19.443,0,0,1,14.8,8.774a17.2,17.2,0,0,1,2.746,9.6,17.393,17.393,0,0,1-2.745,9.638A19.858,19.858,0,0,1,8.8,33.847,27.472,27.472,0,0,1,.1,37.491Z" transform="translate(294.5 164.5) rotate(180)" fill="#40fcfe"/>
              <path id="直线_751-2" data-name="直线 751" d="M4,.5H0v-1H4Z" transform="translate(277.5 146.5) rotate(180)" fill="#40fcfe"/>
              <path id="直线_755-2" data-name="直线 755" d="M.5,50h-1V0h1Z" transform="translate(443.5 146.5)" fill="#4ff643"/>
              <path id="直线_756-2" data-name="直线 756" d="M.5,8h-1V0h1Z" transform="translate(443.5 196.5)" fill="#40fcfe"/>
              <path id="直线_757-2" data-name="直线 757" d="M11,11.707-.707,0,0-.707,11.707,11Z" transform="translate(437.5 198.5)" fill="#40fcfe"/>
              <path id="直线_758-2" data-name="直线 758" d="M0,11.707-.707,11,11-.707,11.707,0Z" transform="translate(438.5 198.5)" fill="#40fcfe"/>

              <path v-if="switchs.rightTop2" @click.stop="switchClick('rightTop2', true)" class="cursor" :stroke="`${circuit.key === 'rightTop2' ? '#FF9800' : ''}`" id="直线_759-2" data-name="直线 759" d="M24.546,54.21l-25-54L.454-.21l25,54Z" transform="translate(418.5 205.5)" fill="#40fcfe"/>
              <path v-else @click.stop="switchClick('rightTop2', false)" class="cursor" :stroke="`${circuit.key === 'rightTop2' ? '#FF9800' : ''}`" id="直线_759-2" data-name="直线 759" d="M.5,55h-1V0h1Z" transform="translate(443.5 204.5)" fill="#fe4040"/>
              
              <path id="直线_760-2" data-name="直线 760" d="M.5,8.5h-1v-9h1Z" transform="translate(443.5 259.5)" fill="#40fcfe"/>
              <path id="直线_761-2" data-name="直线 761" d="M.5,74h-1V0h1Z" transform="translate(443.5 267.5)" fill="#4ff643"/>
              <path id="直线_762-2" data-name="直线 762" d="M.5,9h-1V0h1Z" transform="translate(443.5 341.5)" fill="#40fcfe"/>
              <path id="直线_763-2" data-name="直线 763" d="M10.5.5H-.5v-1h11Z" transform="translate(438.5 350.5)" fill="#40fcfe"/>
              
              <path v-if="switchs.rightTop3" @click.stop="switchClick('rightTop3', true)" class="cursor" :stroke="`${circuit.key === 'rightTop3' ? '#FF9800' : ''}`" id="直线_764-2" data-name="直线 764" d="M24.548,53.213l-25-53,.9-.427,25,53Z" transform="translate(418.5 352.5)" fill="#40fcfe"/>
              <path v-else @click.stop="switchClick('rightTop3', false)" class="cursor" :stroke="`${circuit.key === 'rightTop3' ? '#FF9800' : ''}`" id="直线_764-2" data-name="直线 764" d="M.5,55h-1V0h1Z" transform="translate(443.5 350.5)" fill="#fe4040"/>

              <path id="直线_765-2" data-name="直线 765" d="M.5,11h-1V0h1Z" transform="translate(443.5 404.5)" fill="#40fcfe"/>
              <path id="直线_766-2" data-name="直线 766" d="M.5,110h-1V0h1Z" transform="translate(443.5 415.5)" fill="#4ff643"/>
              <path id="直线_787-2" data-name="直线 787" d="M.5,38h-1V0h1Z" transform="translate(443.5 560.5)" fill="#4ff643"/>
              <path id="直线_795-2" data-name="直线 795" d="M.5,305h-1V0h1Z" transform="translate(443.5 670.5)" fill="#4ff643"/>
              <path id="直线_767-2" data-name="直线 767" d="M97,.5H0v-1H97Z" transform="translate(346.5 488.5)" fill="#4ff643"/>
              <path id="直线_768-2" data-name="直线 768" d="M.5,18.5h-1V-.5h1Z" transform="translate(346.5 488.5)" fill="#4ff643"/>
              <path id="直线_769-2" data-name="直线 769" d="M.5,17.5h-1V-.5h1Z" transform="translate(346.5 507.5)" fill="#40fcfe"/>
              <path id="直线_772-2" data-name="直线 772" d="M.5,29.5h-1V-.5h1Z" transform="translate(346.5 543.5)" fill="#40fcfe"/>
              <path id="直线_770-2" data-name="直线 770" d="M36.5.5H-.5v-1h37Z" transform="translate(328.5 524.5)" fill="#40fcfe"/>
              <path id="直线_771-2" data-name="直线 771" d="M36.5.5H-.5v-1h37Z" transform="translate(328.5 543.5)" fill="#40fcfe"/>
              <g id="组_6593-2" data-name="组 6593">
                <path id="椭圆_296-4" data-name="椭圆 296" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(330 573)" fill="#40fcfe"/>
                <path id="直线_773-4" data-name="直线 773" d="M21.646,22.354l-22-22L.354-.354l22,22Z" transform="translate(335.5 578.5)" fill="#40fcfe"/>
                <path id="直线_774-4" data-name="直线 774" d="M.354,23.354l-.707-.707,23-23,.707.707Z" transform="translate(334.5 577.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_775-2" data-name="直线 775" d="M.5,11h-1V0h1Z" transform="translate(346.5 605.5)" fill="#40fcfe"/>
              <path id="直线_776-2" data-name="直线 776" d="M.5,18h-1V0h1Z" transform="translate(346.5 616.5)" fill="#4ff643"/>
              <path id="直线_777-2" data-name="直线 777" d="M.5,12h-1V0h1Z" transform="translate(346.5 634.5)" fill="#40fcfe"/>
              <path id="直线_778-2" data-name="直线 778" d="M38.5.5H-.5v-1h39Z" transform="translate(327.5 646.5)" fill="#40fcfe"/>
              <path id="直线_779-2" data-name="直线 779" d="M24.5.5H-.5v-1h25Z" transform="translate(334.5 652.5)" fill="#40fcfe"/>
              <path id="直线_780-2" data-name="直线 780" d="M12.5.5H-.5v-1h13Z" transform="translate(340.5 659.5)" fill="#40fcfe"/>
              <path id="直线_781-2" data-name="直线 781" d="M.5,3.5h-1v-4h1Z" transform="translate(443.5 525.5)" fill="#40fcfe"/>
              <path id="直线_786-2" data-name="直线 786" d="M.5,17.5h-1V-.5h1Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              <g id="组_6588-2" data-name="组 6588">
                <path id="直线_782-5" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785-5" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783-5" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784-5" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <g id="组_6583-2" data-name="组 6583">
                <path id="椭圆_297-6" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298-6" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788-6" data-name="直线 788" d="M.5,85h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789-6" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793-5" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790-6" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792-5" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791-6" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794-5" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6585-2" data-name="组 6585" transform="translate(98)">
                <path id="椭圆_297-7" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298-7" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788-7" data-name="直线 788" d="M.5,85h-1V0h1Z" transform="translate(394.5 591.5)" fill="#40fcfe"/>
                <path id="直线_789-7" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793-6" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790-7" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792-6" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791-7" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794-6" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6584-2" data-name="组 6584" transform="translate(49)">
                <path id="椭圆_297-8" data-name="椭圆 297" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 600)" fill="#40fcfe"/>
                <path id="椭圆_298-8" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_788-8" data-name="直线 788" d="M.5,72h-1V0h1Z" transform="translate(394.5 598.5)" fill="#40fcfe"/>
                <path id="直线_789-8" data-name="直线 789" d="M13,.5H0v-1H13Z" transform="translate(410.5 616.5)" fill="#40fcfe"/>
                <path id="直线_793-7" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_790-8" data-name="直线 790" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(411.5 603.5)" fill="#40fcfe"/>
                <path id="直线_792-7" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_791-8" data-name="直线 791" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(417.5 603.5)" fill="#40fcfe"/>
                <path id="直线_794-7" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6586-2" data-name="组 6586" transform="translate(49 132)">
                <path id="椭圆_298-9" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
                <path id="直线_793-8" data-name="直线 793" d="M13,.5H0v-1H13Z" transform="translate(411 653)" fill="#40fcfe"/>
                <path id="直线_792-8" data-name="直线 792" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(412 640)" fill="#40fcfe"/>
                <path id="直线_794-8" data-name="直线 794" d="M.481,25.135l-.963-.27,7-25,.963.27Z" transform="translate(418 640)" fill="#40fcfe"/>
              </g>
              <g id="组_6587-2" data-name="组 6587" transform="translate(19 191)">
                <path id="椭圆_298-10" data-name="椭圆 298" d="M16.5,1A15.5,15.5,0,0,0,5.54,27.46,15.5,15.5,0,0,0,27.46,5.54,15.4,15.4,0,0,0,16.5,1m0-1A16.5,16.5,0,1,1,0,16.5,16.5,16.5,0,0,1,16.5,0Z" transform="translate(378 636)" fill="#40fcfe"/>
              </g>
              <path id="多边形_61-2" data-name="多边形 61" d="M16,2.292,1.6,32H30.4L16,2.292M16,0,32,33H0Z" transform="translate(459 929) rotate(180)" fill="#4ff643"/>
              <path id="直线_796-2" data-name="直线 796" d="M.5,48.5h-1V-.5h1Z" transform="translate(413.5 819.5)" fill="#40fcfe"/>
              <rect id="矩形_1957-2" data-name="矩形 1957" width="33" height="9" transform="translate(397 839)" fill="#40fcfe"/>
              <path id="直线_797-2" data-name="直线 797" d="M12.18,7.684-.684.18l.5-.864,12.864,7.5Z" transform="translate(428.5 842.5)" fill="#40fcfe"/>
              <path id="直线_798-2" data-name="直线 798" d="M.5,10h-1V0h1Z" transform="translate(440.5 839.5)" fill="#40fcfe"/>
              <path id="直线_799-2" data-name="直线 799" d="M9.316,3.632-.632.316l.316-.949L9.632,2.684Z" transform="translate(440.5 839.5)" fill="#40fcfe"/>
              <path id="多边形_62-2" data-name="多边形 62" d="M4,3.162,1.387,11H6.613L4,3.162M4,0,8,12H0Z" transform="translate(461.902 843.633) rotate(111)" fill="#40fcfe"/>
              <g id="组_6589-2" data-name="组 6589" transform="translate(98 219)">
                <path id="直线_782-6" data-name="直线 782" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 528.5)" fill="#40fcfe"/>
                <path id="直线_785-6" data-name="直线 785" d="M0,17.707-.707,17,17-.707,17.707,0Z" transform="translate(426.5 543.5)" fill="#40fcfe"/>
                <path id="直线_783-6" data-name="直线 783" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 528.5)" fill="#40fcfe"/>
                <path id="直线_784-6" data-name="直线 784" d="M18,18.707-.707,0,0-.707,18.707,18Z" transform="translate(443.5 543.5)" fill="#40fcfe"/>
              </g>
              <path id="直线_800-2" data-name="直线 800" d="M.5,4h-1V0h1Z" transform="translate(541.5 743.5)" fill="#40fcfe"/>
              <path id="直线_801-2" data-name="直线 801" d="M.5,19h-1V0h1Z" transform="translate(541.5 762.5)" fill="#40fcfe"/>
              <path id="直线_802-2" data-name="直线 802" d="M98,.5H0v-1H98Z" transform="translate(443.5 732.5)" fill="#4ff643"/>
              <path id="直线_803-2" data-name="直线 803" d="M.5,11.5h-1V-.5h1Z" transform="translate(541.5 732.5)" fill="#4ff643"/>
              <path id="直线_804-2" data-name="直线 804" d="M.5,24h-1V0h1Z" transform="translate(541.5 781.5)" fill="#4ff643"/>
              <path id="直线_805-2" data-name="直线 805" d="M.5,17h-1V0h1Z" transform="translate(541.5 805.5)" fill="#40fcfe"/>
              <path id="矩形_1958-2" data-name="矩形 1958" d="M1,1V46H23V1H1M0,0H24V47H0Z" transform="translate(529 818)" fill="#40fcfe"/>
              <path id="减去_102-2" data-name="减去 102" d="M-7596.5-4068v0l-7.5-28h15l-7.5,28Zm-.5-7v1h1v-1Zm0-3v1h1v-1Zm-1-1v1h1v-1Zm2-1v1h1v-1Zm-1-1v1h1v-1Zm2-1h-1v1h1Zm-4-1v1h1v-1Zm2-1h-1v1h1Zm1-1v1h1v-1Zm-1-1v1h1v-1Zm-3,0v1h1v-1Zm5-1v1h1v-1Zm-4-1v1h1v-1Zm4-1v1h1v-1Zm-2,0v1h1v-1h-1Zm0-1h-1v1h1v-1Zm-3.99,0v1h1v-1Zm4.99,1h1v-1h-1Zm2-2v1h1v-1Zm-3,0v1h1v-1Zm0-1h-1v1h1Zm-3,0v1h1v-1Zm8,0h-1v1h1Zm-4-1v1h1v-1h-1Zm-5,0v1h1v-1h-1Zm4-1v1h1v-1Zm-5,0v1h1v-1Zm7,0v1h1v-1Zm-5,0v1h1v-1Zm7-1v1h1v-1Zm-2,0h-1v1h1Zm-5,0h-1v1h1Z" transform="translate(8138 4919)" fill="#40fcfe"/>
              <path id="直线_806-2" data-name="直线 806" d="M.5,14h-1V0h1Z" transform="translate(541.5 864.5)" fill="#40fcfe"/>
              <path id="直线_807-2" data-name="直线 807" d="M.5,49h-1V0h1Z" transform="translate(541.5 878.5)" fill="#4ff643"/>
              <path id="直线_808-2" data-name="直线 808" d="M.5,12h-1V0h1Z" transform="translate(541.5 930.5)" fill="#40fcfe"/>
              <path id="直线_809-2" data-name="直线 809" d="M51.5.5H-.5v-1h52Z" transform="translate(515.5 942.5)" fill="#40fcfe"/>
              <path id="直线_810-2" data-name="直线 810" d="M34.5.5H-.5v-1h35Z" transform="translate(523.5 951.5)" fill="#40fcfe"/>
              <path id="直线_811-2" data-name="直线 811" d="M17.5.5H-.5v-1h18Z" transform="translate(532.5 960.5)" fill="#40fcfe"/>
              <path id="直线_889" data-name="直线 889" d="M48,.5H0v-1H48Z" transform="translate(223.5 146.5)" fill="#4ff643"/>
              <path id="直线_890" data-name="直线 890" d="M19,.5H0v-1H19Z" transform="translate(388.5 378.5)" fill="#4ff643"/>
              <path id="直线_891" data-name="直线 891" d="M.5,17.5h-1V-.5h1Z" transform="translate(388.5 378.5)" fill="#4ff643"/>
              <path id="直线_892" data-name="直线 892" d="M.5,12.5h-1V-.5h1Z" transform="translate(388.5 396.5)" fill="#40fcfe"/>
              <path id="直线_893" data-name="直线 893" d="M38.5.5H-.5v-1h39Z" transform="translate(369.5 408.5)" fill="#40fcfe"/>
              <path id="直线_894" data-name="直线 894" d="M24.5.5H-.5v-1h25Z" transform="translate(376.5 414.5)" fill="#40fcfe"/>
              <path id="直线_895" data-name="直线 895" d="M12.5.5H-.5v-1h13Z" transform="translate(382.5 421.5)" fill="#40fcfe"/>
            </g>
          </g>
          <g id="箭头组" class="">
            <g v-if="!switchs.leftTop1" :stroke="`${circuit.key === 'leftTop1' ? '#FF9800' : ''}`" id="组_6611" data-name="组 6611">
              <path id="直线_969" data-name="直线 969" d="M0,5.707-.707,5,5-.707,5.707,0Z" transform="translate(375.5 159.5)" fill="#fe4040"/>
              <path id="直线_970" data-name="直线 970" d="M5,5.707-.707,0,0-.707,5.707,5Z" transform="translate(380.5 159.5)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.rightTop1" :stroke="`${circuit.key === 'rightTop1' ? '#FF9800' : ''}`" id="组_6613" data-name="组 6613" transform="translate(781)">
              <path id="直线_969-2" data-name="直线 969" d="M0,5.707-.707,5,5-.707,5.707,0Z" transform="translate(375.5 159.5)" fill="#fe4040"/>
              <path id="直线_970-2" data-name="直线 970" d="M5,5.707-.707,0,0-.707,5.707,5Z" transform="translate(380.5 159.5)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.rightTop2" :stroke="`${circuit.key === 'rightTop2' ? '#FF9800' : ''}`" id="组_6614" data-name="组 6614" transform="translate(1171)">
              <path id="直线_969-3" data-name="直线 969" d="M0,5.707-.707,5,5-.707,5.707,0Z" transform="translate(375.5 159.5)" fill="#fe4040"/>
              <path id="直线_970-3" data-name="直线 970" d="M5,5.707-.707,0,0-.707,5.707,5Z" transform="translate(380.5 159.5)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.rightTop3" :stroke="`${circuit.key === 'rightTop3' ? '#FF9800' : ''}`" id="组_6615" data-name="组 6615" transform="translate(1171 146)">
              <path id="直线_969-4" data-name="直线 969" d="M0,5.707-.707,5,5-.707,5.707,0Z" transform="translate(375.5 159.5)" fill="#fe4040"/>
              <path id="直线_970-4" data-name="直线 970" d="M5,5.707-.707,0,0-.707,5.707,5Z" transform="translate(380.5 159.5)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.leftTop2" :stroke="`${circuit.key === 'leftTop2' ? '#FF9800' : ''}`" id="组_6612" data-name="组 6612" transform="translate(0 146)">
              <path id="直线_969-5" data-name="直线 969" d="M0,5.707-.707,5,5-.707,5.707,0Z" transform="translate(375.5 159.5)" fill="#fe4040"/>
              <path id="直线_970-5" data-name="直线 970" d="M5,5.707-.707,0,0-.707,5.707,5Z" transform="translate(380.5 159.5)" fill="#fe4040"/>
            </g>
          </g>
        </g>
      </svg>
    </template>
  </svg-pan-zoom>
</template>

<script setup>
  import { ref } from "vue"
  import { useStore } from "vuex"
  import { SvgPanZoom } from "vue-svg-pan-zoom"

  const store = useStore()

  const props = defineProps({
    record: Object
  })

  const switchs = ref({
    leftTop1: true,
    leftTop2: true,
    rightTop1: true,
    rightTop2: true,
    rightTop3: true,
  })

  const circuit = store.state.circuit

  const switchClick = (key, status) => {
    store.dispatch("circuit/setKey", key)
    store.dispatch("circuit/setStatus", status)
  }

  const acceptanceControl = status => {
    switchs.value[circuit.key] = status
    switchClick(undefined, false)
  }

  defineExpose({ acceptanceControl })
</script>
