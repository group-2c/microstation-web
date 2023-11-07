/*
 * @author: zzp
 * @date: 2023-11-07 10:53:36
 * @fileName: circuit2.vue
 * @filePath: src/views/DistributionMonitoring/svg/circuit2.vue
 * @description: 电路图2
 */
<template>
  <svg-pan-zoom :fit="true" :center="true" class="svgPanZoom" id="svgPanZoom">
    <template #default>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <clipPath id="clip-path">
            <path id="路径_22490" data-name="路径 22490" d="M0,0H16V11.768l10-.143L22.7,20.1,16,23H0Z" transform="translate(1023 815)" fill="#fff" stroke="#707070" stroke-width="1"/>
          </clipPath>
          <clipPath id="clip-_2">
            <rect width="1920" height="1080"/>
          </clipPath>
        </defs>
        <g id="_2" data-name="2" clip-path="url(#clip-_2)">
          <path id="直线_896" data-name="直线 896" d="M1003.5.5H-.5v-1h1004Z" transform="translate(604.5 219.5)" fill="#4ff643"/>
          <path id="直线_897" data-name="直线 897" d="M56,1H0V-1H56Z" transform="translate(1234.5 219.5)" fill="#40fcfe"/>
          <path id="多边形_65" data-name="多边形 65" d="M22,6.54,4.925,39.62H39.075L22,6.54M22,0,44,42.62H0Z" transform="translate(1286.12 197.5) rotate(90)" fill="#40fcfe"/>
          <path id="多边形_66" data-name="多边形 66" d="M26,2.032,1.714,45H50.286L26,2.032M26,0,52,46H0Z" transform="translate(1001 245) rotate(-90)" fill="#40fcfe"/>
          <path id="椭圆_303" data-name="椭圆 303" d="M63.5,1A62.2,62.2,0,0,0,28.556,11.673a62.685,62.685,0,0,0-22.645,27.5,62.416,62.416,0,0,0,5.762,59.271,62.685,62.685,0,0,0,27.5,22.645,62.416,62.416,0,0,0,59.271-5.762,62.685,62.685,0,0,0,22.645-27.5,62.416,62.416,0,0,0-5.762-59.271,62.685,62.685,0,0,0-27.5-22.645A62.108,62.108,0,0,0,63.5,1m0-1A63.5,63.5,0,1,1,0,63.5,63.5,63.5,0,0,1,63.5,0Z" transform="translate(951 155)" fill="#40fcfe"/>
          <path id="椭圆_304" data-name="椭圆 304" d="M63.5,1A62.2,62.2,0,0,0,28.556,11.673a62.685,62.685,0,0,0-22.645,27.5,62.416,62.416,0,0,0,5.762,59.271,62.685,62.685,0,0,0,27.5,22.645,62.416,62.416,0,0,0,59.271-5.762,62.685,62.685,0,0,0,22.645-27.5,62.416,62.416,0,0,0-5.762-59.271,62.685,62.685,0,0,0-27.5-22.645A62.108,62.108,0,0,0,63.5,1m0-1A63.5,63.5,0,1,1,0,63.5,63.5,63.5,0,0,1,63.5,0Z" transform="translate(858 155)" fill="#40fcfe"/>
          <path id="直线_898" data-name="直线 898" d="M17.646,18.354l-18-18L.354-.354l18,18Z" transform="translate(905.5 201.5)" fill="#40fcfe"/>
          <path id="直线_899" data-name="直线 899" d="M.354,18.354l-.707-.707,18-18,.707.707Z" transform="translate(905.5 218.5)" fill="#40fcfe"/>
          <path id="直线_900" data-name="直线 900" d="M.5,184h-1V0h1Z" transform="translate(922.5 219.5)" fill="#4ff643"/>
          <path id="直线_901" data-name="直线 901" d="M41,.5H0v-1H41Z" transform="translate(902.5 403.5)" fill="#40fcfe"/>
          <path id="直线_902" data-name="直线 902" d="M28,.5H0v-1H28Z" transform="translate(908.5 414.5)" fill="#40fcfe"/>
          <path id="直线_903" data-name="直线 903" d="M.5,15h-1V0h1Z" transform="translate(922.5 388.5)" fill="#40fcfe"/>
          <path id="直线_904" data-name="直线 904" d="M.5,409h-1V0h1Z" transform="translate(604.5 219.5)" fill="#4ff643"/>
          <path id="直线_905" data-name="直线 905" d="M.354,16.354l-.707-.707,16-16,.707.707Z" transform="translate(588.5 627.5)" fill="#40fcfe"/>
          <path id="直线_908" data-name="直线 908" d="M.354,16.354l-.707-.707,16-16,.707.707Z" transform="translate(588.5 636.5)" fill="#40fcfe"/>
          <path id="直线_906" data-name="直线 906" d="M16,16.707-.707,0,0-.707,16.707,16Z" transform="translate(604.5 627.5)" fill="#40fcfe"/>
          <path id="直线_907" data-name="直线 907" d="M16,16.707-.707,0,0-.707,16.707,16Z" transform="translate(604.5 636.5)" fill="#40fcfe"/>
          <path id="直线_909" data-name="直线 909" d="M.5,53h-1V0h1Z" transform="translate(604.5 637.5)" fill="#4ff643"/>
          <path id="直线_910" data-name="直线 910" d="M11.646,12.354l-12-12L.354-.354l12,12Z" transform="translate(598.5 685.5)" fill="#40fcfe"/>
          <path id="直线_911" data-name="直线 911" d="M.354,12.354l-.707-.707,12-12,.707.707Z" transform="translate(598.5 685.5)" fill="#40fcfe"/>
          
          <path v-if="switchs.left1" @click.stop="switchClick('left1', true)" class="cursor" :stroke="`${circuit.key === 'left1' ? '#FF9800' : ''}`" id="直线_912" data-name="直线 912" d="M15.562,29.242l-16-29L.438-.242l16,29Z" transform="translate(588.5 695.5)" fill="#40fcfe"/>
          <path v-else @click.stop="switchClick('left1', false)" class="cursor" :stroke="`${circuit.key === 'left1' ? '#FF9800' : ''}`" id="直线_912" data-name="直线 912" d="M.5,33h-1V0h1Z" transform="translate(604.5 691.5)" fill="#fe4040"/>
          
          <path id="直线_913" data-name="直线 913" d="M.5,17h-1V0h1Z" transform="translate(604.5 724.5)" fill="#40fcfe"/>
          <path id="直线_914" data-name="直线 914" d="M.5,37h-1V0h1Z" transform="translate(604.5 740.5)" fill="#4ff643"/>
          <path id="直线_915" data-name="直线 915" d="M15.658,15.365l-16-15,.684-.73,16,15Z" transform="translate(588.5 762.5)" fill="#40fcfe"/>
          <path id="直线_916" data-name="直线 916" d="M.342,15.365l-.684-.73,16-15,.684.73Z" transform="translate(604.5 762.5)" fill="#40fcfe"/>
          <path id="直线_917" data-name="直线 917" d="M16.657,16.364l-17-16L.343-.364l17,16Z" transform="translate(587.5 770.5)" fill="#40fcfe"/>
          <path id="直线_918" data-name="直线 918" d="M.354,16.354l-.707-.707,16-16,.707.707Z" transform="translate(604.5 770.5)" fill="#40fcfe"/>
          <path id="直线_919" data-name="直线 919" d="M.5,184h-1V0h1Z" transform="translate(604.5 786.5)" fill="#4ff643"/>
          <path id="直线_920" data-name="直线 920" d="M97,.5H0v-1H97Z" transform="translate(604.5 970.5)" fill="#4ef442"/>
          <path id="直线_921" data-name="直线 921" d="M.5,454h-1V0h1Z" transform="translate(701.5 516.5)" fill="#4ff643"/>
          <g id="组_6604" data-name="组 6604">
            <path id="椭圆_305" data-name="椭圆 305" d="M14,1A13,13,0,0,0,4.808,23.192,13,13,0,0,0,23.192,4.808,12.915,12.915,0,0,0,14,1m0-1A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" transform="translate(543 808)" fill="#40fcfe"/>
            <path id="直线_923" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(570.5 822.5)" fill="#40fcfe"/>
            <path id="直线_924" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 818.5)" fill="#40fcfe"/>
            <path id="直线_925" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(575.5 818.5)" fill="#40fcfe"/>
            <path id="直线_926" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <g id="组_6605" data-name="组 6605" transform="translate(47)">
            <path id="椭圆_305-2" data-name="椭圆 305" d="M14,1A13,13,0,0,0,4.808,23.192,13,13,0,0,0,23.192,4.808,12.915,12.915,0,0,0,14,1m0-1A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" transform="translate(543 808)" fill="#40fcfe"/>
            <path id="直线_923-2" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(570.5 822.5)" fill="#40fcfe"/>
            <path id="直线_924-2" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 818.5)" fill="#40fcfe"/>
            <path id="直线_925-2" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(575.5 818.5)" fill="#40fcfe"/>
            <path id="直线_926-2" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <g id="组_6607" data-name="组 6607" transform="translate(47 47)">
            <path id="椭圆_305-3" data-name="椭圆 305" d="M14,1A13,13,0,0,0,4.808,23.192,13,13,0,0,0,23.192,4.808,12.915,12.915,0,0,0,14,1m0-1A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" transform="translate(543 808)" fill="#40fcfe"/>
            <path id="直线_923-3" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(570.5 822.5)" fill="#40fcfe"/>
            <path id="直线_924-3" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 818.5)" fill="#40fcfe"/>
            <path id="直线_925-3" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(575.5 818.5)" fill="#40fcfe"/>
            <path id="直线_926-3" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <g id="组_6606" data-name="组 6606" transform="translate(94)">
            <path id="椭圆_305-4" data-name="椭圆 305" d="M14,1A13,13,0,0,0,4.808,23.192,13,13,0,0,0,23.192,4.808,12.915,12.915,0,0,0,14,1m0-1A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" transform="translate(543 808)" fill="#40fcfe"/>
            <path id="直线_923-4" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(570.5 822.5)" fill="#40fcfe"/>
            <path id="直线_924-4" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 818.5)" fill="#40fcfe"/>
            <path id="直线_925-4" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(575.5 818.5)" fill="#40fcfe"/>
            <path id="直线_926-4" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <g id="组_6608" data-name="组 6608" transform="translate(443 -110.5)">
            <path id="椭圆_305-5" data-name="椭圆 305" d="M11.5,1A10.5,10.5,0,1,0,22,11.5,10.512,10.512,0,0,0,11.5,1m0-1A11.5,11.5,0,1,1,0,11.5,11.5,11.5,0,0,1,11.5,0Z" transform="translate(545 808)" fill="#40fcfe"/>
            <path id="直线_923-5" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(567.5 819.5)" fill="#40fcfe"/>
            <path id="直线_924-5" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(569.5 815.5)" fill="#40fcfe"/>
            <path id="直线_925-5" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 815.5)" fill="#40fcfe"/>
            <path id="直线_926-5" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <path id="直线_927" data-name="直线 927" d="M.5,113h-1V0h1Z" transform="translate(792.5 516.5)" fill="#4ff643"/>
          <path id="直线_928" data-name="直线 928" d="M10.646,11.354l-11-11L.354-.354l11,11Z" transform="translate(786.5 624.5)" fill="#40fcfe"/>
          <path id="直线_929" data-name="直线 929" d="M.354,11.354l-.707-.707,11-11,.707.707Z" transform="translate(786.5 624.5)" fill="#40fcfe"/>

          <path v-if="switchs.center1" @click.stop="switchClick('center1', true)" class="cursor" :stroke="`${circuit.key === 'center1' ? '#FF9800' : ''}`" id="直线_930" data-name="直线 930" d="M16.569,29.253l-17-29L.431-.253l17,29Z" transform="translate(775.5 633.5)" fill="#40fcfe"/>
          <path v-else @click.stop="switchClick('center1', false)" class="cursor" :stroke="`${circuit.key === 'center1' ? '#FF9800' : ''}`" id="直线_930" data-name="直线 930" d="M.5,30h-1V0h1Z" transform="translate(792.5 632.5)" fill="#fe4040"/>

          <path id="直线_931" data-name="直线 931" d="M.5,15h-1V0h1Z" transform="translate(792.5 662.5)" fill="#40fcfe"/>
          <path id="直线_932" data-name="直线 932" d="M.5,39h-1V0h1Z" transform="translate(792.5 677.5)" fill="#4ff643"/>
          <path id="矩形_2028" data-name="矩形 2028" d="M1,1V30H14V1H1M0,0H15V31H0Z" transform="translate(784 733)" fill="#40fcfe"/>
          <path id="多边形_67" data-name="多边形 67" d="M3.5,0,7,20H0Z" transform="translate(796 757) rotate(180)" fill="#40fcfe"/>
          <path id="直线_933" data-name="直线 933" d="M.5,62h-1V0h1Z" transform="translate(792.5 716.5)" fill="#40fcfe"/>
          <path id="直线_934" data-name="直线 934" d="M15,.5H0v-1H15Z" transform="translate(784.5 778.5)" fill="#40fcfe"/>
          <path id="直线_935" data-name="直线 935" d="M11,.5H0v-1H11Z" transform="translate(786.5 781.5)" fill="#40fcfe"/>
          <path id="直线_936" data-name="直线 936" d="M5,.5H0v-1H5Z" transform="translate(789.5 784.5)" fill="#40fcfe"/>
          <path id="直线_937" data-name="直线 937" d="M.5,87h-1V0h1Z" transform="translate(1038.5 516.5)" fill="#4ff643"/>
          <path id="直线_938" data-name="直线 938" d="M8.646,9.354l-9-9L.354-.354l9,9Z" transform="translate(1033.5 599.5)" fill="#40fcfe"/>
          <path id="直线_939" data-name="直线 939" d="M.354,9.354l-.707-.707,9-9,.707.707Z" transform="translate(1033.5 599.5)" fill="#40fcfe"/>

          <path v-if="switchs.right1" @click.stop="switchClick('right1', true)" class="cursor" :stroke="`${circuit.key === 'right1' ? '#FF9800' : ''}`" id="直线_940" data-name="直线 940" d="M16.562,31.24l-17-31L.438-.24l17,31Z" transform="translate(1021.5 604.5)" fill="#40fcfe"/>
          <path v-else @click.stop="switchClick('right1', false)" class="cursor" :stroke="`${circuit.key === 'right1' ? '#FF9800' : ''}`" id="直线_940" data-name="直线 940" d="M.5,32h-1V0h1Z" transform="translate(1038.5 603.5)" fill="#fe4040"/>

          <path id="直线_941" data-name="直线 941" d="M.5,20h-1V0h1Z" transform="translate(1038.5 635.5)" fill="#40fcfe"/>
          <path id="直线_942" data-name="直线 942" d="M.5,86h-1V0h1Z" transform="translate(1038.5 655.5)" fill="#4ff643"/>
          <path id="直线_943" data-name="直线 943" d="M88,.5H0v-1H88Z" transform="translate(1038.5 669.5)" fill="#4ff643"/>
          <path id="直线_944" data-name="直线 944" d="M.5,14h-1V0h1Z" transform="translate(1125.5 669.5)" fill="#4ff643"/>
          <path id="矩形_2029" data-name="矩形 2029" d="M1,1V40H20V1H1M0,0H21V41H0Z" transform="translate(1114 683)" fill="#40fcfe"/>
          <path id="多边形_68" data-name="多边形 68" d="M3.5,0,7,15H0Z" transform="translate(1129 707) rotate(180)" fill="#40fcfe"/>
          <path id="直线_945" data-name="直线 945" d="M.5,17h-1V0h1Z" transform="translate(1125.5 679.5)" fill="#40fcfe"/>
          <path id="直线_946" data-name="直线 946" d="M.5,12h-1V0h1Z" transform="translate(1124.5 724.5)" fill="#40fcfe"/>
          <path id="直线_947" data-name="直线 947" d="M16,.5H0v-1H16Z" transform="translate(1117.5 736.5)" fill="#40fcfe"/>
          <path id="直线_948" data-name="直线 948" d="M10,.5H0v-1H10Z" transform="translate(1120.5 739.5)" fill="#40fcfe"/>
          <path id="直线_949" data-name="直线 949" d="M7,.5H0v-1H7Z" transform="translate(1122.5 743.5)" fill="#40fcfe"/>
          <g id="组_6609" data-name="组 6609" transform="translate(481 -110.5)">
            <path id="椭圆_305-6" data-name="椭圆 305" d="M11.5,1A10.5,10.5,0,1,0,22,11.5,10.512,10.512,0,0,0,11.5,1m0-1A11.5,11.5,0,1,1,0,11.5,11.5,11.5,0,0,1,11.5,0Z" transform="translate(545 808)" fill="#40fcfe"/>
            <path id="直线_923-6" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(567.5 819.5)" fill="#40fcfe"/>
            <path id="直线_924-6" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(569.5 815.5)" fill="#40fcfe"/>
            <path id="直线_925-6" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 815.5)" fill="#40fcfe"/>
            <path id="直线_926-6" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <g id="组_6610" data-name="组 6610" transform="translate(518 -110.5)">
            <path id="椭圆_305-7" data-name="椭圆 305" d="M11.5,1A10.5,10.5,0,1,0,22,11.5,10.512,10.512,0,0,0,11.5,1m0-1A11.5,11.5,0,1,1,0,11.5,11.5,11.5,0,0,1,11.5,0Z" transform="translate(545 808)" fill="#40fcfe"/>
            <path id="直线_923-7" data-name="直线 923" d="M11,.5H0v-1H11Z" transform="translate(567.5 819.5)" fill="#40fcfe"/>
            <path id="直线_924-7" data-name="直线 924" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(569.5 815.5)" fill="#40fcfe"/>
            <path id="直线_925-7" data-name="直线 925" d="M.38,7.325-.38,6.675l6-7L6.38.325Z" transform="translate(572.5 815.5)" fill="#40fcfe"/>
            <path id="直线_926-7" data-name="直线 926" d="M.5,48h-1V0h1Z" transform="translate(557.5 793.5)" fill="#40fcfe"/>
          </g>
          <path id="矩形_2030" data-name="矩形 2030" d="M1,1V190H104V1H1M0,0H105V191H0Z" transform="translate(988 744)" fill="#40fcfe"/>
          <path id="矩形_2031" data-name="矩形 2031" d="M1,1V26H13V1H1M0,0H14V27H0Z" transform="translate(1031 750)" fill="#40fcfe"/>
          <path id="矩形_2032" data-name="矩形 2032" d="M1,1V27H23V1H1M0,0H24V28H0Z" transform="translate(1026 783)" fill="#40fcfe"/>
          <path id="直线_950" data-name="直线 950" d="M.5,42h-1V0h1Z" transform="translate(1038.5 741.5)" fill="#40fcfe"/>
          <path id="直线_951" data-name="直线 951" d="M17,.5H0v-1H17Z" transform="translate(1019.5 787.5)" fill="#40fcfe"/>
          <path id="直线_952" data-name="直线 952" d="M18,.5H0v-1H18Z" transform="translate(1040.5 805.5)" fill="#40fcfe"/>
          <path id="多边形_69" data-name="多边形 69" d="M11,2.075,1.691,19H20.309L11,2.075M11,0,22,20H0Z" transform="translate(1017 787)" fill="#40fcfe"/>
          <path id="多边形_70" data-name="多边形 70" d="M11,2.075,1.691,19H20.309L11,2.075M11,0,22,20H0Z" transform="translate(1060 807) rotate(180)" fill="#40fcfe"/>
          <path id="直线_953" data-name="直线 953" d="M.5,7h-1V0h1Z" transform="translate(1038.5 811.5)" fill="#40fcfe"/>
          <g id="蒙版组_8" data-name="蒙版组 8" clip-path="url(#clip-path)">
            <path id="椭圆_306" data-name="椭圆 306" d="M9.5,1A8.5,8.5,0,1,0,18,9.5,8.51,8.51,0,0,0,9.5,1m0-1A9.5,9.5,0,1,1,0,9.5,9.5,9.5,0,0,1,9.5,0Z" transform="translate(1028 818)" fill="#40fcfe"/>
          </g>
          <path id="直线_954" data-name="直线 954" d="M9,.5H0v-1H9Z" transform="translate(1037.5 827.5)" fill="#40fcfe"/>
          <path id="直线_955" data-name="直线 955" d="M.5,20h-1V0h1Z" transform="translate(1037.5 827.5)" fill="#40fcfe"/>
          <path id="直线_956" data-name="直线 956" d="M.429,35.257l-.858-.515,21-35,.857.515Z" transform="translate(1016.5 846.5)" fill="#40fcfe"/>
          <path id="直线_957" data-name="直线 957" d="M19.743,12.429l-20-12L.257-.429l20,12Z" transform="translate(1007.5 875.5)" fill="#40fcfe"/>
          <path id="直线_958" data-name="直线 958" d="M20.737,13.425l-21-13,.526-.85,21,13Z" transform="translate(1002.5 883.5)" fill="#40fcfe"/>
          <path id="直线_959" data-name="直线 959" d="M.425,21.263l-.85-.526,13-21,.85.526Z" transform="translate(1000.5 890.5)" fill="#40fcfe"/>
          <path id="直线_960" data-name="直线 960" d="M33,.5H0v-1H33Z" transform="translate(1000.5 911.5)" fill="#40fcfe"/>
          <path id="直线_961" data-name="直线 961" d="M.5,24h-1V0h1Z" transform="translate(1033.5 899.5)" fill="#40fcfe"/>
          <path id="直线_962" data-name="直线 962" d="M.5,23h-1V0h1Z" transform="translate(1042.5 900.5)" fill="#40fcfe"/>
          <path id="直线_963" data-name="直线 963" d="M33,.5H0v-1H33Z" transform="translate(1042.5 911.5)" fill="#40fcfe"/>
          <path id="直线_964" data-name="直线 964" d="M11.561,22.239l-12-22L.439-.239l12,22Z" transform="translate(1063.5 889.5)" fill="#40fcfe"/>
          <path id="直线_965" data-name="直线 965" d="M.267,12.423l-.534-.845,19-12,.534.845Z" transform="translate(1053.5 883.5)" fill="#40fcfe"/>
          <path id="直线_966" data-name="直线 966" d="M.257,12.429l-.515-.858,20-12,.514.858Z" transform="translate(1048.5 875.5)" fill="#40fcfe"/>
          <path id="直线_967" data-name="直线 967" d="M20.571,35.257l-21-35L.429-.257l21,35Z" transform="translate(1037.5 846.5)" fill="#40fcfe"/>
          <path id="直线_968" data-name="直线 968" d="M903,.5H0v-1H903Z" transform="translate(502.5 516.5)" fill="#4ff643"/>
          <g id="箭头组">
            <g v-if="!switchs.left1" :stroke="`${circuit.key === 'left1' ? '#FF9800' : ''}`" id="箭头组1">
              <path id="直线_971" data-name="直线 971" d="M5.646,6.354l-6-6L.354-.354l6,6Z" transform="translate(604.5 691.5)" fill="#fe4040"/>
              <path id="直线_972" data-name="直线 972" d="M.354,6.354l-.707-.707,6-6,.707.707Z" transform="translate(598.5 691.5)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.center1" :stroke="`${circuit.key === 'center1' ? '#FF9800' : ''}`" id="箭头组1">
              <path id="直线_973" data-name="直线 973" d="M5.646,6.354l-6-6L.354-.354l6,6Z" transform="translate(792 630)" fill="#fe4040"/>
              <path id="直线_974" data-name="直线 974" d="M.354,6.354l-.707-.707,6-6,.707.707Z" transform="translate(786 630)" fill="#fe4040"/>
            </g>
            <g v-if="!switchs.right1" :stroke="`${circuit.key === 'right1' ? '#FF9800' : ''}`" id="箭头组1">
              <path id="直线_975" data-name="直线 975" d="M5.646,6.354l-6-6L.354-.354l6,6Z" transform="translate(1038 604)" fill="#fe4040"/>
              <path id="直线_976" data-name="直线 976" d="M.354,6.354l-.707-.707,6-6,.707.707Z" transform="translate(1032 604)" fill="#fe4040"/>
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
    left1: true,
    center1: true,
    right1: true,
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
