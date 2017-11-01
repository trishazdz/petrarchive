<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0"
    xmlns:eg="http://www.tei-c.org/ns/Examples"
    xmlns:tei="http://www.tei-c.org/ns/1.0" 
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" 
    xmlns:exsl="http://exslt.org/common"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:fn="http://www.w3.org/2005/xpath-functions"
    extension-element-prefixes="exsl msxsl"
    xmlns="http://www.w3.org/1999/xhtml" 
    exclude-result-prefixes="xsl tei xd eg fn #default">
    <xsl:import href="teibp.xsl"/>
       <xsl:output method="xml" encoding="utf-8" version="1.0" indent="yes" standalone="no" media-type="text/html" omit-xml-declaration="no" doctype-system="about:legacy-compat" /> 
    <xsl:param name="pbNote" select="''"/>
    
    <xsl:param name="customCSS.norm" select="concat($filePrefix,'/css/custom_norm.css')"/>
    <xsl:param name="customCSS" select="concat($filePrefix,'/css/custom.css')"/>
  
    
  
 
    <xsl:template name="siteNavigation">
      <xsl:variable name="nav">
        <xsl:copy-of select="document('../nav_content.html')"/>
      </xsl:variable>
      <xsl:copy-of select="$nav"/>
    </xsl:template>
    
    <xsl:template match="tei:g" priority="99">
      <xsl:variable name="charId" select="substring-after(@ref,'#')"/>
        <xsl:choose>
            <xsl:when test="//tei:char[@xml:id = $charId]/tei:mapping[@type = 'visual']">
              <xsl:value-of select="normalize-space(//tei:char[@xml:id = $charId]/tei:mapping[@type = 'visual'])"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="concat('[',normalize-space(//tei:char[@xml:id = $charId]/tei:charName),']')"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='1-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left;">
            <xsl:apply-templates select="ancestor::tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb[@n = '1-of-2'] = $mycb and following::tei:cb[@n='2-of-2']]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='2-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left; width:500px; margin-right:2em; margin-left:2em;">
            <xsl:apply-templates select="ancestor::tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb[@n = '2-of-2'] = $mycb]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]"/>
    <xsl:template match="tei:lg[@type = 'sestian']//tei:lg">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]" mode="process">
      <xsl:if test="@n mod 5 = 0">
      <!-- sestina line numbers -->
      <span class="lno"><xsl:value-of select="@n"/></span>
      </xsl:if>
      <xsl:element name="{local-name()}">
        <xsl:call-template name="addID"/>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:element>
    </xsl:template>
    
    <xsl:param name="htmlTitle">
        <xsl:value-of select="normalize-space(/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title[1])"/>        
    </xsl:param>
    
    <xsl:template name="htmlHead">
        <head>
            <!--
            <script type="text/javascript" src="//use.typekit.net/ctk5ksw.js"></script>
            <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
            -->
            <meta charset="UTF-8"/>
            <link id="maincss" rel="stylesheet" type="text/css" href="{$teibpCSS}"/>
            <link id="customcss" rel="stylesheet" type="text/css" href="{$customCSS}"/>
            <script type="text/javascript" src="{$jqueryJS}"></script>

          <!-- <script type="text/javascript" src="{$jqueryBlockUIJS}"></script>-->
          <script type="text/javascript" src="{$teibpJS}"><xsl:comment> </xsl:comment></script>
          <script type="text/javascript" src="../js/petrarchive.js"><xsl:comment> </xsl:comment></script>

            <xsl:call-template name="rendition2style"/>
            <title><xsl:value-of select="$htmlTitle"/><!-- don't leave empty. --></title>
            <xsl:if test="$includeAnalytics = true()">
                <xsl:call-template name="analytics"/>
            </xsl:if>
        </head>
    </xsl:template>
    
    <!-- Petrarchive Toolbox -->
    <xsl:template name="teibpToolbox">
      <xsl:if test="not(/tei:TEI/@xml:id = 'glossary') and   not(/tei:TEI/@xml:id = 'chronology_petrarch') and not(/tei:TEI/@xml:id='papers_and_presentations')">
        <div id="teibpToolbox">
            <div>
                <!--<h1 style="display:inline;">text view </h1>-->
                <select id="themeBox" onchange="switchCustomCSS(this);">
                    <option value="{$customCSS}" >diplomatic transcription</option>
                    <option value="{$customCSS.norm}">edited text</option>
                </select>		
                
            </div>
          <xsl:if test="//tei:back/tei:div[@type = 'commentary']">
          <div>
            <!-- <img style="border:0;" src="../images/settings-icon.png"/> -->
           
            <select id="commentarySelect" onchange="revealCommentary(this,'commentary')">
              <option value="hide">hide commentary</option>
              <option value="show">show commentary</option>             
            </select>
          </div>
          </xsl:if>
        </div>
      </xsl:if>
    </xsl:template>
    
    <xsl:variable name="htmlFooter">
      <footer>© 2013-2016 H. Wayne Storey &amp; John A. Walsh. This document is part of the Petr<em>archive</em>.<br/>
        Team: H. Wayne Storey, John A. Walsh, Isabella Magni, Grace Thomas, Allison M. McCormack (2013-14), and Laura Pence.<br/>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/4.0/80x15.png" /></a>&#160;
        <a xmlns:cc="http://creativecommons.org/ns#" href="http://petrarchive.org" property="cc:attributionName" rel="cc:attributionURL"><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Petr<i>archive</i></span></a> by <a href="http://www.indiana.edu/~frithome/faculty/italian/storey.shtml">H. Wayne Storey</a> and <a href="http://johnwalsh.name/">John A. Walsh</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.<br/>
        Funding and support provided by the <a href="http://neh.gov/">National Endowment for the Humanities</a> and <a href="http://www.indiana.edu/">Indiana University-Bloomington</a>.<br/>
        Powered by <a href="{$teibpHome}">TEI Boilerplate</a>.
</footer>
    </xsl:variable>
  
<xd:doc><xd:desc>These lines get line numbers. Canzone is not regular.</xd:desc></xd:doc>
  
  <!-- alternate for 7vv:
        tei:lg[@type = 'canzone_7vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '10']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '21']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '26']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '31']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '40']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '49']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '56']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '61']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '66']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '70']|
    tei:lg[@type = 'canzone_7vv']//tei:l[@n = '74']|
   -->
  <!-- alternate for 14vv:
    
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '10']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '21']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '26']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '31']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '40']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '49']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '56']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '61']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '66']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '70']|
    tei:lg[@type = 'canzone_14vv']//tei:l[@n = '74']|
    
    -->
  
    <!-- alternate for 20vv:
       tei:lg[@type = 'canzone_20vv']//tei:l[@n mod 5 = 0 and @n mod 10 != 0]|
    -->
  
  <xsl:template match="tei:lg[@type = 'madrigal']//tei:l[@n = '4']|
    tei:lg[@type = 'madrigal']//tei:l[@n = '7']|
    tei:lg[@type = 'ballata_mezzana']//tei:l[@n = '3']|
    tei:lg[@type = 'ballata_mezzana']//tei:l[@n = '8']|
    tei:lg[@type = 'ballata_grande']//tei:l[@n = '5']|
    tei:lg[@type = 'ballata_grande']//tei:l[@n = '9']|
    tei:lg[@type = 'sonnet']//tei:l[@n = '5']|
    tei:lg[@type = 'sonnet']//tei:l[@n = '9']|
    
    tei:lg[@type = 'canzone_7vv']//tei:l[@n mod 7 = 0]|
    
    tei:lg[@type = 'canzone_10vv']//tei:l[@n mod 5 = 0]|
    
    tei:lg[@type = 'canzone_14vv']//tei:l[@n mod 7 = 0]|
    
   
    
    
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '20']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '30']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '50']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '60']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '65']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '75']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '80']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '90']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '95']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '105']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '110']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '120']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '125']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '135']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '140']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '150']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '155']|
    
    
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '9']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '19']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '25']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '29']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '39']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '49']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '55']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '59']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '65']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '69']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '75']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '79']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '85']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '89']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '95']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '99']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '105']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '109']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '115']|
    tei:lg[@type = 'canzone_16vv']//tei:l[@n = '119']|
    
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '9']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '21']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '25']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '31']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '41']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '51']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '55']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '61']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '65']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '71']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '75']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '81']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '85']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '91']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '95']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '101']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '105']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '111']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '115']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '121']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '125']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '131']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '135']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '141']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '145']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '151']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '155']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '161']|
    tei:lg[@type = 'canzone_20vv']//tei:l[@n = '165']">
        <span class="lno"><xsl:value-of select="@n"/></span>
            <xsl:element name="{local-name()}">
                <xsl:call-template name="addID"/>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
    </xsl:template>
  
  <xsl:template match="tei:lg[@xml:id = 'rvf360']//tei:l[@n = '1']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '4']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '7']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '10']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '13']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '16']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '19']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '22']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '25']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '28']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '31']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '34']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '37']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '40']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '43']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '46']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '49']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '52']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '55']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '58']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '61']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '64']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '67']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '70']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '73']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '76']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '79']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '82']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '85']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '88']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '91']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '94']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '97']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '100']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '103']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '106']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '109']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '112']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '115']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '118']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '121']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '124']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '127']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '130']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '133']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '136']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '139']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '142']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '145']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '148']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '151']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '154']|
    tei:lg[@xml:id = 'rvf360']//tei:l[@n = '157']" priority="80">
    <!-- Isabella: continue with line numbers above. -->
    <span class="lno"><xsl:value-of select="@n"/></span>
  <xsl:element name="{local-name()}">
    <xsl:call-template name="addID"/>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:element>
  </xsl:template>
  
  <xsl:template match="tei:lg[@type = 'canzone_15vv']//tei:l[@n = '5']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '15']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '20']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '30']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '35']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '45']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '50']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '60']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '65']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '75']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '80']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '90']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '95']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '105']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '110']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '120']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '125']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '135']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '140']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '150']|
    tei:lg[@type = 'canzone_15vv']//tei:l[@n = '155']" mode="rvf360v">
    <span class="lno"><xsl:value-of select="@n"/></span>
    <xsl:element name="{local-name()}">
      <xsl:call-template name="addID"/>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:element>
  </xsl:template>
  
  <xsl:template match="*" mode="rvf360v"> 
    <xsl:element name="{local-name()}">
      <xsl:call-template name="addID"/>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:element>
  </xsl:template>
  
  <xsl:template match="//tei:lg[@xml:id = 'rvf360v']//tei:l[@sameAs]" priority="99">
    <xsl:param name="sameAs" select="substring-after(@sameAs,'#')"/>
    <xsl:apply-templates select="//*[@xml:id = $sameAs]" mode="rvf360v"/>
  </xsl:template>
  
    <xsl:template match="*[@sameAs]">
        <xsl:param name="sameAs" select="substring-after(@sameAs,'#')"/>
        <xsl:apply-templates select="//*[@xml:id = $sameAs]"/>
    </xsl:template>
  
  <xsl:template name="pb-handler">
    <xsl:param name="n"/>
    <xsl:param name="facs"/>
    <xsl:param name="id"/>
    
    <span class="-teibp-pageNum">
      <!-- <xsl:call-template name="atts"/> -->
      <span class="-teibp-pbNote"><xsl:value-of select="$pbNote"/></span>
      <xsl:value-of select="@n"/>
      <xsl:text> </xsl:text>
    </span>
    <span class="-teibp-pbFacs">
      <a class="gallery-facs" rel="prettyPhoto[gallery1]">
        <xsl:attribute name="onclick">
          <xsl:value-of select="concat('showFacs(',$apos,$n,$apos,',',$apos,$facs,$apos,',',$apos,$id,$apos,')')"/>
        </xsl:attribute>
        <img  alt="{$altTextPbFacs}" class="-teibp-thumbnail">
          <xsl:attribute name="src">
            <xsl:value-of select="@facs"/>
          </xsl:attribute>
        </img>
      </a>
    </span>
    <!--
    <span class="petrarchive-visindex-thumbnail">
      <a href="{concat('../images/visindex/',$id,'.svg')}">
        <img src="{concat('../images/visindex/',$id,'.svg')}" 
          height="64" border="1"/>
        
      </a>
    </span>
    -->
  </xsl:template>
  
  
  
  <xsl:template match="tei:ab[@type = 'blockSubst']">
    <xsl:variable name="maniculeId" select="concat(@xml:id,'Trigger')"/>
    <div id="{$maniculeId}" class="manicule-palimpsest-trigger">
      <xsl:attribute name="onclick">
        <!-- <xsl:value-of select="concat('showHide(&quot;',$maniculeId,'&quot;,&quot;',tei:subst/tei:del/tei:lg/@xml:id, '&quot;,&quot;',tei:subst/tei:add/tei:lg/@xml:id,'&quot;)'"/> -->
        <xsl:value-of select="'JavaScript:showHide('"/>
        <xsl:value-of select="$apos"/>
        <xsl:value-of select="$maniculeId"/>
        <xsl:value-of select="concat($apos,',',$apos)"/>
        <xsl:value-of select="normalize-space(tei:subst/tei:del/tei:lg/@xml:id)"/>
        <xsl:value-of select="concat($apos,',',$apos)"/>
        <xsl:value-of select="normalize-space(tei:subst/tei:add/tei:lg/@xml:id)"/>
        <xsl:value-of select="concat($apos,')')"/>
      </xsl:attribute>  
      <xsl:value-of select="'&#x261C;'"/>
    </div>
      <xsl:element name="{local-name()}">
        <xsl:call-template name="addID"/>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:element>
  </xsl:template>
  
  <xsl:template match="tei:div[@type = 'commentary']">
    <div class="commentary" id="commentary" style="display:none;">
      <xsl:variable name="rvfTarget" select="substring-after(@corresp,'#')"/>
      <xsl:variable name="rvfNum" select="//tei:lg[@xml:id = $rvfTarget]/@n"/>
      <h1>Commentary: <cite>Rvf</cite> <xsl:value-of select="' '"/><xsl:value-of select="$rvfNum"/>
     </h1>
      <hr/>
      <xsl:apply-templates/>
    </div>
  </xsl:template>
  
  <xsl:template match="tei:div[@type= 'commentary']/tei:note|tei:div[@type= 'commentary']/tei:div[@type= 'translation']">
    <section>
    <h2>
      <xsl:choose>
        <xsl:when test="@type = 'introduction'">
          <xsl:value-of select="'Introduction'"/>
        </xsl:when>
        <xsl:when test="@type = 'prosodic'">
          <xsl:value-of select="'Prosodic features'"/>
        </xsl:when>
        <xsl:when test="@type = 'syntactic'">
          <xsl:value-of select="'Syntactic features'"/>
        </xsl:when>
        <xsl:when test="@type = 'historical'">
          <xsl:value-of select="'Historical genesis'"/>
        </xsl:when>
        <xsl:when test="@type = 'physical'">
          <xsl:value-of select="'Physical collocation and diplomatic conditions'"/>
        </xsl:when>
        <xsl:when test="@type = 'variants'">
          <xsl:value-of select="'Significant variants from the tradition'"/>
        </xsl:when>
        <xsl:when test="@type = 'language'">
          <xsl:value-of select="'Language notes'"/>
        </xsl:when>
        <xsl:when test="@type = 'thematic'">
          <xsl:value-of select="'Thematic notes'"/>
        </xsl:when>
        <xsl:when test="@type = 'translation'">
          <xsl:value-of select="'Translation'"/>
        </xsl:when>
      </xsl:choose>
    </h2>
      <xsl:element name="{local-name()}">
        <xsl:call-template name="addID"/>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:element>
    </section>
  </xsl:template>
        
  
        
    
</xsl:stylesheet>
