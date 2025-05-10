// backend/db/seeders/demo-more-spot-images.js
'use strict';

// Seeder to populate SpotImages table with demo inmages for each spot
const { Spot, SpotImage, User } = require('../models'); 

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
  // Insert demo images associated with specific spots into SpotImages table

  await SpotImage.bulkCreate([
    {
      spotId: 4,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.4&permmsgid=msg-f:1831720476459536972&th=196b9411872e124c&view=att&disp=safe&realattid=196b940d6cca15f82ec1&zw&saddbat=ANGjdJ9UoOz6jfLXnAAWRaLJRfhvecEt_wb0YyvMYdrn-TpWHfTxyw1xHRxdrv5zPL-cconBQexXOCAYV15oX24L1TN9bfum3wmWxMvoHokuoqJ8HHDZXPO0jB61BoI_XWZM0SguWagdXc4hgJY3gnwyNSboksONPopZCpv1GTd1XtDue93e24emXLfBOHG_2gHJ-ygYSz-kOouro1TxxFrbvyGeozlPiYaB1QD3IFFpN83OYyFCBErzRbOSuQexLGkDmaQl4OfeZkOOqMDdEzXL-KDa4LbBNS4UeXKKBBCWnVseCzOLY0cV4BgT0HouppBmgucy78o7fYCQS2I0XWCvczsBl-zqMm-_7R7rHyr-DYWeOQCzrwCHTyVhsxv6d7J3O0VYCCBbqJFYsWjXyzXGFa79RdM773oa8nAoNcB5Ih-nVSbairCsINHjH3lU-ORuSRhDidQOcPWlGq-YTpB1eoYFqINkKD_HBRz4Tgy2HKpRcR8NY-sQqP5Uy9ddpB5pA4WrwkB05_EhUoaOtifI6XF4NOz5CySjhbnYJmsL0gx14YLCwA96HwzU5LvugT54VVhOXuRTHuJW-O0lzlGmSrwljAXNz6i9nSDqvclgr__DXNwDoub4BbgfuFkRamAWvcy5HWKf1mPzMp28NPegNwc-6Tts_QTVlS7W5BgdtRwYQ33cS6rCw9XPNF6Lypi7DiwoDE_oMtvhjknrLF6tvzWBpkmJ_U459-IxVhaeCMidH95eN2aI5pflqaaF8dU-llpsiMNFiz8gA_mcFZu6ZRKc_pxuAoLb5wPSkbxtbyYYCQ4zRzkYydSxdNu2APRfxtqABSIAdSIHJrhnIiNAFLQrPdfdSy_P6ncaa8xIi9YF988GN43T5DTuDPjsOMmaUaQTIGSNhCI1LhB2MDEb1WJsIkeYDLrNbA-RhrNxDpizCUwpoAje4TvBLpppg5pXpkttaCMqTtkdFfs6mCNNuLXwUReBgO-jXKb21pXwjWAAHTOAFd7nLzm-vXzGo_WWa54gx2R40TtXyZMWoWnRrgtbtjfkhbTyEvaEplhf3prLwls7xpieTMrSKVhjtYLE41ZgeOAnQ_eqo6uDpahWJTNAA5k0tIjmQlCAUQAx-tRyr5RCw-cBDvUakxaMX4BzoCDGFYwf_nAz6LsulK5_TQ30s40VRAiVfiwNJ9zNL9R1F1th-2vJNPiNats',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://example.com/spot1-2.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.1&permmsgid=msg-f:1831720476459536972&th=196b9411872e124c&view=att&disp=safe&realattid=196b940d6d9ec09a7ed2&zw&saddbat=ANGjdJ_79VUxs-Qz9GrG4IgJzDiL3lj0tpH8FvkjbgJPvqs1KjFueEidc-HPK1VXyeYtuilzMP1eR8C_WuAXFJqPM8BRU3OEDip1u6SuvhLhyLwVnHoryCDACq14FIfC42qvtTS_89N8JLf31EHKRuB97Pl9337ssv36W2tT4vPUe_pI4qukPqM3M5FTtvqznHoLSdeQC8aqSd-aT2jt3K7U3l3vXD0RLu4tYTcFAqjMbIoY2aJytRYreq-d92DwWn23ELy2PKCUt1VVKBchF_AwK2ZI6qKE5ag_ag1Q0cfDGAI5d_XxItScFIWZPGgQYyr1e_R9zWUCia-i3p4cD9X55e3sarLc9Nm7iWL2jawfkqE5O53AByw_Z1XaqFFSlpIHZJuSPemYeTx253WZEgtZSf5rjTF4MF8mUdlvG-dagORpdiZA5pve0Okw7m51V4U0XH9cFSQwl-uS1onmqGbYwKRWeG7Bw67VVn3Zur_L4DaTAmQKCTw4LGOoR1rHysk-S_ZDFNqsBxvUJ-xevGDZxl1HiAsYsLTXKcQo8N8x0qRXcj38vN8NlixfHD3iGOgblg_5mUm0YsX-_RYr_dE7abXAAWNGGe27ud2TCTHHtn4jj1PCC4-wdcr2KPn0YxdYlAYG3wSb1oxK9bLu8RRxHeIBg7HXRbLrBZ6AsURwLAtSmIImrlQqRykyU1DT4yD8Z8P7TcvqkwMJ6abSsCVXr2PsDW4K-8ixCFWYNuAAgfjeNnSABojbpIbNV28b7e0GEm5zcDvFg4nosqscAuP-UQ1-oXHD2YjRwvSgsxMMDizOtz_fRFOH8ILPUYLtvvH9RzyTXWKEbf4pNAEOvTRgav1TjqWX-aw34z9kC3DCCRwrUEz8Zs8BcFumA5t-4Ka0s62yXmpeY7kII2u2-QDveCAaIkl8FC1zLbDKTYhoPEdNnCKUiEdl1cmSvpRwpvXffgt30C61DIEO4yuiUZxJHOyl2ozf6SWjyymQJ2nVAHo-F47RG3Q9hP4TZh6MbacdwjmiP7LxpizLPHiHb91VbVEkiidpqofWqkA_rBghFpsmtnrs6Z2CGcJaWD7p2iBYJIEX14Npt4WR8_kNCQMvhkTcG8eJnOX8rP1h2DjpezCo90HqwbEzdm3KugGbSGFybFvcZZVUFwPcG_HoeMrvjOeQK3eqILVYZ6SOFaBa5lTZDlML_Iu0RGlwTB4',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.2&permmsgid=msg-f:1831718640494594093&th=196b92660f24482d&view=att&disp=safe&realattid=196b926226381e7c8e72&zw&saddbat=ANGjdJ9ReRxvzZjzCpu-6x76Ic7rzlOtFYv5I1ZzrhxtvK6n4oAJZNCoszfG7DGMA3ki8uJqaPnog-CJot5N9TSZXvH2FF2dJjCDRU5YCsGprl5LdrbsNVt8N2JG1bn0USqZqMvtUnu4rGB6gV-jJcPqYqiECxOJoN2w6SnIwQZqmYVtYtOdq1ZGQhbiV8ryGLJXrazqQmWDT-wzQwSjurdagX-ZOUMLSQH22dA_3gZ4dl25dnulptru2-LLBmormarpOrlMu4GMz0zloXo32nrsqVNfAvHmeIchDyRfaU5NFXfuXvGv1SDm06p2fFh0MOmGGcx2TOrrLW-UmBDTob_vZEID6tEqzh-4KDCCSCrcXNh45TA-gQB1u2KDizAVfovbxYYvBds4xLf7OG3aBiM1pUPkG0IG-2oiv7vtUluTmVtt77P10YqWF0VjJz1c4nwEfFOo_4OpqfNja_4l2ly5Q8TwqD9j9tA0r67gHJSXmWs49FOxuymlXD_TUNyKNMlNYNBRKSt4VEYkP2b_qYx09GZVOYIxI7Nbirxkbcab17cwg_TQ-ZfP0TsxJvOavf5MbzU4V3KhcjYB6tKYUNiEtA9dt_gHR-NXQbzXxSKrMfiBO339TqLC6_IKYM1p_pw9milweJceGm7Hcr4yTWtvjJEDbkL_v4204rkJvz2mPqmyrA5IT4IttkNUDsX0yzT2EOToGBlIHn5DU114LU64kirvfdClpxBsRp2pxObZavJf5ED-cPFPsGG9tb9FSpS3v6XsTRd-iV8GqGiXI55faxHCqnR5goHv9hPsRspcyxbnqou4fu9Um9k5k13H1T_B4nGuYMA95xVb5DCv-0_OfTbumntpdEr4DpZxPEBldmbQ44C-Z2uJIlaVsZ1nQPZKoNQS8ZMXdbLNMk8pBQf3pcMf-zLD9xflQyrsKYBGfqqTOg0825VIm5qmbRmQxNwfDnuL9GfVgRg7XrFbv5ww7-1SorYuP2MGoCLExi7k8as54kSmTHVG7QGDLby9r5rABGMz_12x3u0SOOvYgD3qrloifOBPmf3jzWmhive9m8Go8XeMA9kw9dBRkRLbODik_cz4fQzwq5haudgw69MULu6tlIX1F6Ieuy0PD9L3JfychpCRa1sp_RtaDuR46u61oxRfvFPPu4y5wnIl-mU54fwQn5aoJmhtGSM5gdyBLeOtxXxwubb09zXdlUE',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.1&permmsgid=msg-f:1831718640494594093&th=196b92660f24482d&view=att&disp=safe&realattid=196b92622502d13efef1&zw&saddbat=ANGjdJ_ENseHAPSvzx9QKBDdVtkxGXGE0yHUb3Bw_JlzmYlJxP01RDtkzxy3Rna_EK5CX1I7Nh_DRyz4ks2oJmvbEUgWVWnqQYSowV2ExJM3dnNAldk4ZB2Za7fs128P69eLr5pgfd0vZrqoT8PLBfTq_K5NZ7GIEVDbu5p_blo-JlpPBfkB8a4Gwb7UL57IVGaUMseQBH9XuTRKYfb845ZMMmQh3Y5bzHvkzdk9kp-yEzuyBK3ldMJDUNvrcrMJeX9fq0jpMzhQrqERrSDahPxHigruPRETqZrm_GYhyol1ET0kBuTfZ-5UGNBYsYS1F7qseTiCa9R9bIho3FER2BUZBfDzBvX-UjaQ1JMps3efI0Ed_mdTgMViq_Hgjzy4KHZME36hMZMAM5hzEMvsw1B85c0VJO6120x5fim1obK796cLq-CwesotfM5fPoSVb8i0lU8fbtD3fJ0AmW1CAPdB2p08ZJ0jbkJuVE8teqPvdhHKt38PSx_d4CDWxp1NtSdzGbM7GiW97jfGBiu3OojoNFBcydVnTBEy2BV127dxaXJp7_3-hAD4kvwr7-ownBZqwUwt5i5TLPlBf6PIVNZLxb4zU4Jp5Vbi8zTbWQu1pLggw7TUfkHdEOWb7JaUqvoDlbkAQjwbjVC8axm9eooOM_FdM_8tKNjJF8UuaDGfpLucQL8dj2mVLIrkCA6yu91c1s1Y4MWq6vL-9bjxfkGo8k_ow2xK8ArCrbUu0Me3O0ugeKgkhk5JYXQTrgljYjOaLNKeKHYrtD55pTS4q2R-fUrYOVJT-z4-pySiePhmw0eHArZNs-Bw70xaSq9bO3A8bazGXVGUW_qKe-2LpCgLgl-y9m3WMc1FP1W3OXXw9Y8c1Z0LiocCpjgH3UFHchYxT6YMQJNpaAz_vLpVG38o099P9_cd0trjVLtu2qf3X407G2i07YL88ytxB67TbITHo-NFcLli6H8-rdXnZQmhnBBXRz8GqrV-85c4CAOkc_tKHQTB74QkxwnLsKRgzj28H-ZB05L65cIQXdK90zasn7E3JtL_cmTipUEaZ8r3sMHeuIW4RQyS3QkvLAZW1QXGmrMVQB8z8P_QI3T8qPtu3vRmlZe9a7hQdMfa7XH_O-oEfSjgUL73fJ409l3HJLJEZ33dP_3077rEBf0xzaSongpWW_qmIUMmMYJ0e9KLWXIOloO1uS1ANhx5xH0',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.2&permmsgid=msg-f:1831720476459536972&th=196b9411872e124c&view=att&disp=safe&realattid=196b940d6e536b3ccee3&zw&saddbat=ANGjdJ9YLohQFGBh9v4OVnfRyyZTsq5tIUM5wJTi7A1tmZs-tl6IctsgInDMnCJ3sk5HV8pZFfWPJKuQC17uM8MQlrL-BV6HYSquHqH97rxJRV_BwtdgTOWYQKov3QQS_LaOS0I0DsKRRA5U6VBBCBdI9BQJj0gGEJAehm6ylkr5soMRXy3DDTjl44un1_hCLnTxzeYoFgqxdnCFlVz9PvW7Rf8XVAYpb8Yv7bwzn5yILk36bqOICxZYDu6lnXMBNAlKcOmEFcf5Wl2GssQcD5oMnxgg9IC634_uaqRrPs5WPCiQeGm1wqLZEMtKP2XUbNIaGbBMl9h9Ko1OTcnCRYBmUeFg0ZGGKvbcW09_RqZlRAnqBc_QvAz1RWW8yJP6ZK_0szQ54WUHJyTI-iV8GNyTjchUsiBfqWU0nX1YdtTJD_aiofGQy7e56Y_Utge1fECQGC5-LdCtKvqpsLi-XU77dNrK9bm_chON2MyBumB5bs1MP5mODPasOvt84Tr8Vy_LDtY8cXv9kb8qAYgalWlA3WrFhRNvHziRYLx1rMoJhXLOJ-A0qpDOgGq_Rp7jfJpqUx3VZKV9hcCCXXMUlJrtrT9_usJe-5t3s7DTvrevxAkkl9Tc7etQzEt3zHrYq5Li1B_-DMpctxhGFaH0viG5Zm1XdSyV4UgQUvXAkMK9RctvKRYRLMgfc27x1Q6kCXpTlowfxRE1Z6njCcuLfeo8VgMjyMJHt6c-CpOXBmGHZ1Z932kRgmPTgkmLqhrD359JQ0Fot9Z33tb-huEgrzIYhjMWejep61LtA8cxxIrc1fWkFi3cCZ6mEzJI045Myodcj8iuCzOcKykzFKXo_0UTRUTBQzc3yMagNJD5-mQel905IqhtGGQH60ynr6L0FQMWs_aE6giFGRkGlDOrQ29A1lT5gnc6gs8ZZpEqlGZLubiAxkhvEAmV0NcGWAMcgWj3sS98p9YguHhhP04TDp1VNG-EwD8AvrFR6Zkfc5Q17SuFBvxBNcoyXy0N3sEX39nNOps087ALpsFNjTk-p2AlRGsVTWbd3cztPIJVmLP24QDl3fi-WoHbEfLARq5deLD09QqnGpfxSX6oP7Q8elF08x4kSjju9AcdJtX5MKWGewel3NzYaVuLZFkJzyqBoqNb25jH2DPPkA3qvCNhA5YYX5Sdn8TyhvK2CHJDxdmnNMXEEQEPbezXzMMqh0w',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=939b356001&attid=0.3&permmsgid=msg-f:1831720476459536972&th=196b9411872e124c&view=att&disp=safe&realattid=196b940d6f276b6eee84&zw&saddbat=ANGjdJ-ya9748z8L8zM8peiIaTbRRmfg0ez6pBCjc9Om2x1qO-CL-5hAn1DyJSOrtRGu2w8FhTagjcJshsXvib5-K9k40kZGrWnpCDwQgEk-2nUSy5T46WuU71JIp30ykLPnO3mwooJwbBooJME9I8LiUVqmrzzZ-XADCKYXQHDec9JOvGq63j23WAoAh3zEYESz4_2anGa-8F-OTA8IC7nTolHLfjQoPAvZc2hI1_MShrcC0Z8xr0rB86I-L-V8J1_V_2v_aHWYsCI4xHkB0pW4d2z1CblNhuzisizhLMS2iTfU6_AeIpN6206xtDlgtpozBycXLvUr72_cLyDfSwa95eFq3Lqn7n628iDjJlzipeSS-o8b6Tvu4_ezi0kNlAQAmCfqYWWU0e1BPpQdAvX8eKvCRZCzrfEh8BShv7Fb4haxKVJ3rog15FLcK04v2fNSEyNPAIn5yGz1uepuuJoIN-mfbDfmOO9AIufmWGuN9CiDusqEznEMtni84rXY-dE4HudHV84ZiVjued4xbhF765ufK45xsA4KHjUq82AxijMXkhMboeJ_qMCtRMvdG58Y0pKXZQUnll311pluYQphGjto2MrBThLxdavCYHxCW1-vEP5hwISYeRMr8gkT6TlMYPBDVFaU8SLHwqqmUC6PFrXKVdrA2ZErYX85jLbdi-_vwy7tW_KAb9-8tOUpOl1CvsgSc4zcbLbD5L7HkVfX3ottBo4VYe3n7sLR0r1HcPzBQwVE_LOS-SnErL7JTXmSTSdd10p0ECBqzMBfbOo5P-MJ5myKAZlkHUbbql2ftAdRvP_Ybo2cruCOS9-QjFHlaokFrE81H3aOsXkuIVB53GpWsDlUsY_-3yFtpIxHIyDEg3Rx8Lf490Wu4taWWgafs6Cv-ah2DhEGWKLVrQN0PVex2bfbRvTskB34Dy8GY13GrdWb6xK_E3Z889bjGlh9CPd43bSmTkXga9X6oinuSKlIQImHaqoDb-L33BSlBrIXkkLueDRWhKimrRsVNtWk7JLkPWNMUvxp-bcY1SHym_5aAygHZvHb1fExarozL3Uc4KhTwl3qw3mD4N6P3t5JumCFsGUcAIJX3_3c-CbTOg5qq3hcYoRlbO_fiQ0ElTXjdocr3oqcLh3ZbJy_sAzWNQs4BdUETMNGKVBZkx9KA_e2tphJ1FfIcDSZa2dFIwMiUWH9aIXe49F_u28',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://example.com/spot3-2.jpg',
      preview: false
    }
  ], 
  { // Ensures the data follows model validations
    validate: true 
  });
},

  async down (queryInterface, Sequelize) {
    
    // Remove all entries from SpotImages table

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
