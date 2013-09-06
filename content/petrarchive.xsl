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
    
    <xsl:param name="includeToolbox" select="false()"/>
    
    <xsl:template match="tei:g" priority="99">
        <xsl:value-of select="normalize-space(id(substring-after(@ref,'#'))/tei:mapping[@type = 'visual'])"/>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='1-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left; margin-right:2em;">
            <xsl:apply-templates select="//tei:*[preceding-sibling::tei:cb[@n = '1-of-2'] = $mycb and following-sibling::tei:cb[@n='2-of-2']]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='2-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left; margin-right:2em;">
            <xsl:apply-templates select="//tei:*[preceding-sibling::tei:cb[@n = '2-of-2'] = $mycb]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:l[preceding-sibling::tei:cb]"/>
    <xsl:template match="tei:l[preceding-sibling::tei:cb]" mode="process">
            <xsl:element name="{local-name()}">
                <xsl:call-template name="addID"/>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
    </xsl:template>
    
    <xsl:template name="htmlHead">
        <head>
            <script type="text/javascript" src="//use.typekit.net/ctk5ksw.js"></script>
            <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
            <meta charset="UTF-8"/>
            <link id="maincss" rel="stylesheet" type="text/css" href="{$teibpCSS}"/>
            <link id="customcss" rel="stylesheet" type="text/css" href="{$customCSS}"/>
            <script type="text/javascript" src="{$jqueryJS}"></script>
            <script type="text/javascript" src="{$jqueryBlockUIJS}"></script>
            <script type="text/javascript" src="{$teibpJS}"></script>
            <script type="text/javascript">
                $(document).ready(function() {
                $("html > head > title").text($("TEI > teiHeader > fileDesc > titleStmt > title:first").text());
                $.unblockUI();	
                });
            </script>
            <xsl:call-template name="rendition2style"/>
            <title><!-- don't leave empty. --></title>
            <xsl:if test="$includeAnalytics = true()">
                <xsl:call-template name="analytics"/>
            </xsl:if>
        </head>
    </xsl:template>
        
    
</xsl:stylesheet>