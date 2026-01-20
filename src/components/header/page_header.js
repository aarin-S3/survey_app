/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        page_header.js  
 * @summary     Page Header Script Component 
 * 
 * @author      Avinash Sahoo
 * Created on : 22-12-2025
 */
import { setHeaderTitleColor } from 'src/helpers/helper_function';

export default {
  name: 'PageHeader',
  /**
   * @method   props
   * @param    
   * @returns  
   * @summary  Defines the input properties required to populate the page header.
   *
   * @author   Avinash Sahoo
   * @created  22-12-2025
   */
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },

  computed: {
   /**
    * @method   setHeaderTitleColor
    * @param    
    * @returns  
    * @summary  Determines the dynamic CSS classes for the Header Title based on Quasar's dark mode state.
    *
    * @author   Avinash Sahoo
    * @created  22-12-2025
    */
    setHeaderTitleColor
  }

}