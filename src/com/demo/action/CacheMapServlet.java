/*package com.demo.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.demo.dao.CityDAO;
import com.demo.dao.CountyDAO;
import com.demo.dao.ProvinceDAO;
import com.demo.model.City;
import com.demo.model.County;
import com.demo.model.Province;
import com.demo.util.CacheMap;

*//**
 * CacheMapServlet used to store the province, city, county when tomcat server starts.
 * 
 * @author Fajie Han (hfajie@cntomorrow.com)
 * @since 2015-4-19 下午10:11:14
 *//*
public class CacheMapServlet implements Servlet
{

	public void destroy()
	{
		// nothing.
	}

	public ServletConfig getServletConfig()
	{
		// nothing.
		return null;
	}

	public String getServletInfo()
	{
		// nothing.
		return null;
	}

	public void init(ServletConfig arg0) throws ServletException
	{
		List<Province> lprovince = new ProvinceDAO().getProvince();
		Map<String, String> provinceMap = new HashMap<String, String>();
		for (Province p : lprovince)
		{
			provinceMap.put(p.getId(), p.getProvinceName());
		}
		
		List<City> lcity = new CityDAO().getCity();
		Map<String, String> cityMap = new HashMap<String, String>();
		for (City c : lcity)
		{
			cityMap.put(c.getId(), c.getCityName());

		}
		
		List<County> lcounty = new CountyDAO().getCounty();
		Map<String, String> countyMap = new HashMap<String, String>();
		for (County c : lcounty)
		{
			countyMap.put(c.getId(), c.getCountyName());
		}

		new CacheMap(provinceMap, cityMap, countyMap);
	}

	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException
	{
		// nothing.
	}
}
*/